# wifi_rover

Control a RC car over the internet!

| ![enter image description here](https://raw.githubusercontent.com/aziddy/wifi_rover/master/media/IMG_20190111_194400.jpg) | ![enter image description here](https://raw.githubusercontent.com/aziddy/wifi_rover/master/media/IMG_20181231_172916.jpg) |
|--|--|

## Issues That Arose During the Build 
* Was going to use a Arduino Micro Clone but the serial communications for it require installing a CH340 driver that's hard to compile on a Pi
*  I was going to make a logic level convertor but I didn't have the correct pull up resistors on hand. So I just used a full Uno for serial communications 
* I broke the steering gearbox for RC car. So I glued a servo in its place that works well
* Getting actual streaming software on PI is effort so just sending compressed JPEG images over websockets seem like a 

## Component List
* Raspberry PI 3 
* Arduino Uno
* Almost any USB Camera
* Any RC car or [The One I Used](https://www.amazon.ca/dp/B015DZP1R8/ref=sspa_dk_detail_0?psc=1&pd_rd_i=B015DZP1R8&pd_rd_w=dQz0q&pf_rd_p=dd8bce25-0727-4a5d-b121-eef3dd7bc606&pd_rd_wg=J5q89&pf_rd_r=9149TJCHYBZFBPTSZRW8&pd_rd_r=1bb8f8d5-176a-11e9-b659-e924ff0deddf)
* Battery Bank that can do 2.5+ Amps Out

## Server

npm install express <br/>
npm install socketio

## Getting Communications on Pi

sudo apt-get install python3

sudo apt-get update

***[make sure its Python 3.4.x]***

pip3 install python-socketio <br/>
pip3 install asyncio


## GETTING AND BUILDING OPENCV 3.4 ON PI


***[OPTIONAL: needed for displaying opencv frames]***
sudo apt-get install libgtk2.0-dev pkg-config


***[be in the home directory]***

sudo apt-get install build-essential cmake pkg-config <br/>
sudo apt-get install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev <br/>
sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev <br/>
sudo apt-get install libxvidcore-dev libx264-dev <br/>
sudo apt-get install libgtk2.0-dev libgtk-3-dev <br/>
sudo apt-get install libatlas-base-dev gfortran <br/>

wget -O opencv.zip https://github.com/opencv/opencv/archive/3.4.1.zip

wget -O opencv_contrib.zip https://github.com/opencv/opencv_contrib/archive/3.4.1.zip

unzip opencv.zip

unzip opencv_contrib.zip

cd ~/opencv-3.4.1/
mkdir build
cd build

cmake -D CMAKE_BUILD_TYPE=RELEASE \
-D CMAKE_INSTALL_PREFIX=/usr/local \
-D INSTALL_PYTHON_EXAMPLES=ON \
-D OPENCV_EXTRA_MODULES_PATH=~/opencv_contrib-3.4.1/modules \
-D BUILD_EXAMPLES=ON ..

sudo nano /etc/dphys-swapfile

***[find and switch out value]***

CONF_SWAPSIZE=1024

***[restart pi]*** <br/>
***[navigate to "opencv-3.4.1/build" directory]***

sudo make -j4

***[wait forever]***

sudo make install
sudo ldconfig


***[now we can confirm cv2 python bindings]*** <br/>
ls /usr/local/lib/python3.x/dist-packages



using python3
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE5MTY5MzQ5MzMsLTEyMzc0MjEzMjksMT
Q3MDIxODA0NSwtNDYwODc4NTQyXX0=
-->