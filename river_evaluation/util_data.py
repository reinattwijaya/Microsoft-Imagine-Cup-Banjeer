import os
import sys
import math
import time
import datetime
import numpy as np
import pandas as pd
from PIL import Image
import matplotlib.pyplot as plt
import torch
import torch.nn as nn
import torchvision.utils
import torch.nn.functional as F
import torchvision.transforms as transforms
import torchvision.datasets as dset
import pycocotools.coco as COCO
import random

def Collate_fn(batch):
    return tuple(zip(*batch))

def reverse_transform(inp):
    inp = inp.numpy().transpose((1, 2, 0))
    mean = np.array([0.485, 0.456, 0.406])
    std = np.array([0.229, 0.224, 0.225])
    inp = std * inp + mean
    inp = np.clip(inp, 0, 1)
    inp = (inp * 255).astype(np.uint8)

    return inp

def masks_to_colorimg(masks):
    colors = np.asarray([(0, 255, 0), (255, 255, 0), (255, 0, 0)])

    colorimg = np.ones((masks.shape[1], masks.shape[2], 3), dtype=np.float32) * 255
    channels, height, width = masks.shape

    for y in range(height):
        for x in range(width):
            selected_colors = colors[masks[:,y,x] > 0.8]

            if len(selected_colors) > 0:
                colorimg[y,x,:] = np.mean(selected_colors, axis=0)

    return colorimg.astype(np.uint8)

class river_dataset_resnetunet(torch.utils.data.Dataset):
    def __init__(self, root, rand_transform = False, transform = None, num_class = 3, resized_size = 1024):
        self.root = root
        self.rand_transform = rand_transform
        self.transform = transform
        self.resized_size = resized_size
        self.num_classes = num_class
        
        # load all image files, sorting them to ensure that they are aligned
        self.imgs = list(sorted(os.listdir(os.path.join(root, "img"))))
        self.masks = list(sorted(os.listdir(os.path.join(root, "mask"))))
       
    def random_transform(self, image, label):
        #Random Perspective
        if random.random() > 0.5:
            i, j = transforms.RandomPerspective.get_params(self.resized_size, self.resized_size, 0.2)
            image = transforms.functional.perspective(image, i, j)
            label = transforms.functional.perspective(label, i, j)

        # Random vertical flipping
        if random.random() > 0.5:
            image = transforms.functional.vflip(image)
            label = transforms.functional.vflip(label)

        if random.random() > 0.5:
            ran = random.random()
            image = transforms.functional.rotate(image, ran*45)
            label = transforms.functional.rotate(label, ran*45)
        

        return image, label    
        
    def __getitem__(self, idx):        
        # open the img and mask
        img_path = os.path.join(self.root, "img", self.imgs[idx])
        mask_path = os.path.join(self.root, "mask", self.masks[idx])
        img = Image.open(img_path).convert("RGB")
        mask_helper = Image.open(mask_path)
        
        # random transform
        if self.rand_transform == True:
            img, mask_helper = self.random_transform(img, mask_helper)
              
        # resize
        img = transforms.Resize(size = self.resized_size)(img)
        mask_helper = transforms.Resize(size = self.resized_size)(mask_helper)
        
        # to numpy array
        img = np.array(img)
        mask_helper = np.array(mask_helper)
        
        mask = np.zeros((self.num_classes, mask_helper.shape[0], mask_helper.shape[1]))
        
        for i in range(img.shape[0]):
            for j in range(img.shape[1]): 
                if mask_helper[i][j] !=0 :
                    mask[mask_helper[i][j] - 1][i][j] = 1
        
        img = self.transform(img)
        return [img, mask]
    
    def __len__(self):
        return len(self.masks)
     
        
class dataset_pred(torch.utils.data.Dataset):
    def __init__(self, root, resize_size):
        self.root = root
        self.imgs = list(sorted(os.listdir(os.path.join(root, "img"))))
        self.transform = transforms.Compose([transforms.ToTensor(),
                                             transforms.Normalize([0.485, 0.456, 0.406], 
                                                                  [0.229, 0.224, 0.225])
                                           ])
        self.resized_size = resize_size
        
    def __getitem__(self, idx):
        img_path = os.path.join(self.root, "img", self.imgs[idx])
        img = Image.open(img_path).convert("RGB")
        img = transforms.Resize(size = self.resized_size)(img)
        img = np.array(img)
        img = self.transform(img)
        
        img_name = self.imgs[idx]
        
        return [img, img_name]
    
    def __len__(self):
        return len(self.imgs)