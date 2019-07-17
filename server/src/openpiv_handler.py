import sys
import os

from openpiv import tools, process, scaling, validation, filters

import numpy as np
import matplotlib.pyplot as plt
import base64


def two_images(image_1, image_2):

    with open("image_1.bmp", "wb") as fh1:
        fh1.write(base64.b64decode(image_1))

    with open("image_2.bmp", "wb") as fh2:
        fh2.write(base64.b64decode(image_2))

    frame_a  = tools.imread( 'image_1.bmp' )
    frame_b  = tools.imread( 'image_2.bmp' )
    frame_a = (frame_a*1024).astype(np.int32)
    frame_b = (frame_b*1024).astype(np.int32)
    
    searchsize = 64  # pixels, search in image B
    winsize = 32 # pixels
    overlap = 16 # pixels
    dt = 0.02 # sec


    u, v, sig2noise = process.extended_search_area_piv( frame_a, frame_b, window_size=32, 
        overlap=overlap, dt=dt, search_area_size=searchsize, sig2noise_method='peak2peak' )
    x, y = process.get_coordinates( image_size=frame_a.shape, window_size=winsize, overlap=overlap )
    u, v, mask = validation.sig2noise_val( u, v, sig2noise, threshold = 1.3 )
    u, v, mask = validation.global_val( u, v, (-1000, 2000), (-1000, 1000) )
    u, v = filters.replace_outliers( u, v, method='localmean', max_iter=10, kernel_size=2)
    x, y, u, v = scaling.uniform(x, y, u, v, scaling_factor = 96.52 )


    file_name = 'result.txt'
    if os.path.isfile(file_name):
        os.remove(file_name)
    tools.save(x, y, u, v, mask, file_name)

 
    with open(file_name, "rb") as resultFile:
        file_reader = resultFile.read()
        image_encode = base64.encodestring(file_reader)
        base64_string = str(image_encode, 'utf-8')
    
    return base64_string
