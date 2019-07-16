import sys
import os

from openpiv import tools, process, validation, filters, scaling, pyprocess 

import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
import base64


def two_images(image_1, image_2):

    with open("image_1.bmp", "wb") as fh1:
        fh1.write(base64.b64decode(image_1))

    with open("image_2.bmp", "wb") as fh2:
        fh2.write(base64.b64decode(image_2))

    frame_a  = tools.imread( 'image_1.bmp' )
    frame_b  = tools.imread( 'image_2.bmp' )
    
    winsize = 32 # pixels
    searchsize = 64  # pixels, search in image B
    overlap = 12 # pixels
    dt = 0.02 # sec

    u, v, sig2noise = pyprocess.piv( frame_a.astype(np.int32), frame_b.astype(np.int32), 
                                                        window_size=winsize, overlap=overlap, dt=dt, 
                                                        search_size=searchsize, sig2noise_method='peak2peak' )
    x, y = pyprocess.get_coordinates( image_size=frame_a.shape, window_size=searchsize, overlap=overlap )
    u, v, mask = validation.sig2noise_val( u, v, sig2noise, threshold = 1.3 )
    u, v = filters.replace_outliers( u, v, method='localmean', max_iter=10, kernel_size=2)
    x, y, u, v = scaling.uniform(x, y, u, v, scaling_factor = 96.52 )

    file_name = 'result.txt'
    if os.path.isfile(file_name):
        os.remove(file_name)
    tools.save(x, y, u, v, np.zeros_like(u), file_name ) # no masking, all values are valid

 
    with open(file_name, "rb") as resultFile:
        file_reader = resultFile.read()
        image_encode = base64.encodestring(file_reader)
        base64_string = str(image_encode, 'utf-8')
    
    return base64_string