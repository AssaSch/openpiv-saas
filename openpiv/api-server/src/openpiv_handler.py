import sys
import os

from openpiv import tools, process, validation, filters, scaling, pyprocess 

import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
import base64


def two_images(image_1, image_2):

    local_dir = os.path.dirname(os.path.realpath(__file__))
    newFile_1 = open('image_1.bmp', 'w+b')
    newFileByteArray_1 = bytes(image_1)
    newFile_1.write(newFileByteArray_1)
    newFile_1.close()
    newFile_2 = open('image_2.bmp', 'w+b')
    newFileByteArray_2 = bytes(image_2)
    newFile_2.write(newFileByteArray_2)
    newFile_2.close()
    frame_a  = tools.imread( 'image_1.bmp' )
    frame_b  = tools.imread( 'image_2.bmp' )
    
    winsize = 32 # pixels
    searchsize = 64  # pixels, search in image B
    overlap = 12 # pixels
    dt = 0.02 # sec

    u, v, sig2noise = pyprocess.extended_search_area_piv( frame_a.astype(np.int32), frame_b.astype(np.int32), 
                                                        window_size=winsize, overlap=overlap, dt=dt, 
                                                        search_area_size=searchsize, sig2noise_method='peak2peak' )
    x, y = pyprocess.get_coordinates( image_size=frame_a.shape, window_size=searchsize, overlap=overlap )
    u, v, mask = validation.sig2noise_val( u, v, sig2noise, threshold = 1.3 )
    u, v = filters.replace_outliers( u, v, method='localmean', max_iter=10, kernel_size=2)
    x, y, u, v = scaling.uniform(x, y, u, v, scaling_factor = 96.52 )

    file_name = 'result.txt'
    tools.save(x, y, u, v, np.zeros_like(u), file_name ) # no masking, all values are valid

    a = np.loadtxt(file_name)
    fig=plt.figure()
    invalid = a[:,4].astype('bool')
    fig.canvas.set_window_title('Vector field, '+str(np.count_nonzero(invalid))+' wrong vectors')
    valid = ~invalid
    plt.quiver(a[invalid,0],a[invalid,1],a[invalid,2],a[invalid,3],color='r')
    plt.quiver(a[valid,0],a[valid,1],a[valid,2],a[valid,3],color='b')
    plt.draw()
    plt.savefig('test_plot.jpg')

 
    with open("test_plot.jpg", "rb") as imageFile:
        string = base64.b64encode(imageFile.read())
    
    return 'test_plot.jpg'
