import sys
import os

from openpiv import tools, process, scaling, validation, filters

import numpy as np
import matplotlib.pyplot as plt
import base64


def two_images(image_1, image_2, search_area_size=64, window_size=32, overlap=16, dt=0.02):
    with open("image_1.bmp", "wb") as fh1:
        fh1.write(base64.b64decode(image_1))

    with open("image_2.bmp", "wb") as fh2:
        fh2.write(base64.b64decode(image_2))

    frame_a  = tools.imread( 'image_1.bmp' )
    frame_b  = tools.imread( 'image_2.bmp' )
    frame_a = (frame_a*1024).astype(np.int32)
    frame_b = (frame_b*1024).astype(np.int32)

    if not search_area_size:
        search_area_size = 64
    if not window_size:
        window_size = 32
    if not overlap:
        overlap = 16
    if not dt:
        dt = 0.02

    u, v, sig2noise = process.extended_search_area_piv( frame_a, frame_b, window_size=window_size, 
        overlap=overlap, dt=dt, search_area_size=search_area_size, sig2noise_method='peak2peak' )
    x, y = process.get_coordinates( image_size=frame_a.shape, window_size=window_size, overlap=overlap )
    u, v, mask = validation.sig2noise_val( u, v, sig2noise, threshold = 1.3 )
    u, v, mask = validation.global_val( u, v, (-1000, 2000), (-1000, 1000) )
    u, v = filters.replace_outliers( u, v, method='localmean', max_iter=10, kernel_size=2)
    x, y, u, v = scaling.uniform(x, y, u, v, scaling_factor = 96.52 )

    file_name_text = 'result.txt'
    file_name_png = 'result.png'
    if os.path.isfile(file_name_text):
        os.remove(file_name_text)
    if os.path.isfile(file_name_png):
        os.remove(file_name_png)
    tools.save(x, y, u, v, mask, file_name_text)
    a = np.loadtxt(file_name_text)
    fig = plt.figure()
    invalid = a[:,4].astype('bool')
    fig.canvas.set_window_title('Vector field, '+str(np.count_nonzero(invalid))+' wrong vectors')
    valid = ~invalid
    plt.quiver(a[invalid,0],a[invalid,1],a[invalid,2],a[invalid,3],color='r',scale=100, width=0.0025)
    plt.quiver(a[valid,0],a[valid,1],a[valid,2],a[valid,3],color='b',scale=100, width=0.0025)
    plt.draw()
    plt.savefig(file_name_png, format="png")
 
    with open(file_name_text, "rb") as resultFileText:
        file_reader_text = resultFileText.read()
        text_encode = base64.encodestring(file_reader_text)
        base64_string_text = str(text_encode, 'utf-8')
    
    with open(file_name_png, "rb") as resultFilePng:
        file_reader_image = resultFilePng.read()
        image_encode = base64.encodestring(file_reader_image)
        base64_string_image = str(image_encode, 'utf-8')
    
    return base64_string_text, base64_string_image
