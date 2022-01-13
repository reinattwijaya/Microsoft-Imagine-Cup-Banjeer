from osgeo import gdal
from PIL import Image
import numpy as np
import os
import gc
import argparse

parser  = argparse.ArgumentParser(description = 'tif -> jpg')
parser.add_argument('folder', help = 'relative path to the folder')
parser.add_argument('step', help = 'square image export size', type = int)
args    = parser.parse_args()
path    = args.folder

files   = os.listdir(path)

#hyper_parameters
step    = args.step

for tif_file in files:
  print(f'Exporting {tif_file}')
  save_path   = tif_file.split('.')[0]
  save_path   = f'{str(args.step)}_{save_path}'
  
  if not os.path.isdir(f'./{path}/{save_path}'):
    os.mkdir(f'./{path}/{save_path}')
    
  data  = gdal.Open(f'./{path}/{tif_file}')
  r     = data.GetRasterBand(1)
  rr    = r.ReadAsArray()
  x, y  = rr.shape
  
  if not os.path.isdir(f'./{path}/{save_path}/red'):
    os.mkdir(f'./{path}/{save_path}/red')
  print(f"Exporting Red for {tif_file}")
  for i in range(0, x - step, step):
    for j in range(0, y - step, step):
      array = rr[i:i+400, j:j+400]
      np.savez_compressed(f'./{path}/{save_path}/red/{i}_{j}.npz', array)

  del r
  del rr
  gc.collect()

  print("Exporting Green")
  r = data.GetRasterBand(2)
  rr= r.ReadAsArray()
  
  if not os.path.isdir(f'./{path}/{save_path}/green'):
    os.mkdir(f'./{path}/{save_path}/green')
  for i in range(0, x - step, step):
    for j in range(0, y - step, step):
      array = rr[i:i+400, j:j+400]
      np.savez_compressed(f'./{path}/{save_path}/green/{i}_{j}.npz', array)
  del r
  del rr
  gc.collect()

  print("Exporting Blue")
  r = data.GetRasterBand(3)
  rr= r.ReadAsArray()
  
  if not os.path.isdir(f'./{path}/{save_path}/blue'):
    os.mkdir(f'./{path}/{save_path}/blue')
  for i in range(0, x - step, step):
    for j in range(0, y - step, step):
      array = rr[i:i+400, j:j+400]
      np.savez_compressed(f'./{path}/{save_path}/blue/{i}_{j}.npz', array)
  del r
  del rr
  gc.collect()

  print("Processing Image")
  if not os.path.isdir(f'./{path}/{save_path}/jpg'):
    os.mkdir(f'./{path}/{save_path}/jpg')
  for i in range(0, x - step, step):
    for j in range(0, y - step, step):
      r = np.load(f'./{path}/{save_path}/red/{i}_{j}.npz')['arr_0']
      g = np.load(f'./{path}/{save_path}/green/{i}_{j}.npz')['arr_0']
      b = np.load(f'./{path}/{save_path}/blue/{i}_{j}.npz')['arr_0']
      m = np.stack((r, g, b), axis = 2)
      img = Image.fromarray(m)
      img.save(f'./{path}/{save_path}/jpg/{i}_{j}.jpeg')
      
      del r 
      del g
      del b
      gc.collect()


      
