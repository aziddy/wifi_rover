# wifi_rover

Control a RC car over wifi 

## Server

npm install express
npm install socketio

## Getting Communications on Pi

sudo apt-get install python3

[make sure its Python 3.4.x]

pip3 install python-socketio
pip3 install asyncio
pip3 install websocket-client
pip3 install numpy

sudo pip3 install --upgrade --ignore-installed urllib3


## GETTING AND BUILDING OPENCV 3.4 ON PI


[OPTIONAL: needed for displaying opencv frames]
sudo apt-get install libgtk2.0-dev pkg-config


[be in the home directory]

sudo apt-get install build-essential cmake pkg-config
sudo apt-get install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev
sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev
sudo apt-get install libxvidcore-dev libx264-dev
sudo apt-get install libgtk2.0-dev libgtk-3-dev
sudo apt-get install libatlas-base-dev gfortran

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

cd /etc/dphys-swapfile

CONF_SWAPSIZE=1024

[restart pi]
[navigate to "opencv-3.4.1/build" directory]

sudo make -j4

[wait forever]

sudo make install
sudo ldconfig


[now we can confirm cv2 python bindings]
ls /usr/local/lib/python3.x/dist-packages



using python3
