# wifi_rover

Control a RC car over the internet!

My girlfriend went on vacation recently. So I made this thing so she control it halfway across the world



<p align="center" style="vertical-align: top; position: relative" >
  <img style="vertical-align:top" src="https://raw.githubusercontent.com/aziddy/wifi_rover/master/media/IMG_20190111_194400.jpg" width="400"/>
    <img style="vertical-align:top" src="https://raw.githubusercontent.com/aziddy/wifi_rover/master/media/IMG_20181231_172916.jpg" width="400"/>
    <img style="vertical-align:top" src="https://github.com/aziddy/wifi_rover/blob/master/media/browser.gif?raw=true" width="400"/>
  <img style="vertical-align:top" src="https://github.com/aziddy/wifi_rover/blob/master/media/rover.gif?raw=true" width="400"/>
  
</p>



## Issues That Arose During the Build 
* Was going to use a Arduino Micro Clone but the serial communications for it require installing a CH340 driver that's hard to compile on a Pi. So I went with a full Uno
* I broke the steering gearbox for RC car. So I glued a servo in its place that works well
* Getting actual streaming software on PI is a effort so just sending compressed JPEG images over websockets seemed like a quick and dirty way

## Component List
* Raspberry PI 3 
* Arduino Uno
* Servo (Only if you dont break the steering on your RC car)
* Almost any USB Camera
* Any RC car or [The One I Used](https://www.amazon.ca/dp/B015DZP1R8/ref=sspa_dk_detail_0?psc=1&pd_rd_i=B015DZP1R8&pd_rd_w=dQz0q&pf_rd_p=dd8bce25-0727-4a5d-b121-eef3dd7bc606&pd_rd_wg=J5q89&pf_rd_r=9149TJCHYBZFBPTSZRW8&pd_rd_r=1bb8f8d5-176a-11e9-b659-e924ff0deddf)
* Battery Bank that can do 2.5+ Amps Out


<p align="center" style="vertical-align: top; position: relative" >
<img style="vertical-align:top" src="https://raw.githubusercontent.com/aziddy/wifi_rover/master/media/wiring.png" width="600"/>
</p>


## Reverse Engineering the RC Car
So I followed the traces on the PCB, got the schematic for the motor controller (MX1919) and whipped out the oscilloscope.

The main controller on the PCB was sending 2 basic digital signals at 3v logic to pins 2 and 3 on the MX1919 for foward and reverse

So I slapped two digital ouputs from a Arduino on pins 2 and 3 to take control

<p align="center" style="vertical-align: top; position: relative" >
  <img style="vertical-align:top" src="https://raw.githubusercontent.com/aziddy/wifi_rover/master/media/circuit.PNG" width="400"/>
    <img style="vertical-align:top" src="https://raw.githubusercontent.com/aziddy/wifi_rover/master/media/IMG_20190103_230744.jpg" width="400"/>
</p>

## Server
Ended up using Node with Express and SocketIO as a relay

```
npm install express
npm install socketio
```

## Getting Communications on Pi


```
sudo apt-get update
sudo apt-get install python3
```

***[make sure its Python 3.4.x]***
```
pip3 install python-socketio
pip3 install asyncio
```

## GETTING AND BUILDING OPENCV 3.4 ON PI


***[OPTIONAL: needed for displaying opencv frames]***
```
sudo apt-get install libgtk2.0-dev pkg-config
```

***[be in the home directory]***
```
sudo apt-get install build-essential cmake pkg-config
sudo apt-get install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev
sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev
sudo apt-get install libxvidcore-dev libx264-dev
sudo apt-get install libgtk2.0-dev libgtk-3-dev
sudo apt-get install libatlas-base-dev gfortran
```
```
wget -O opencv.zip https://github.com/opencv/opencv/archive/3.4.1.zip
wget -O opencv_contrib.zip https://github.com/opencv/opencv_contrib/archive/3.4.1.zip
```
```
unzip opencv.zip
unzip opencv_contrib.zip
```
```
cd ~/opencv-3.4.1/
mkdir build
cd build

cmake -D CMAKE_BUILD_TYPE=RELEASE \
-D CMAKE_INSTALL_PREFIX=/usr/local \
-D INSTALL_PYTHON_EXAMPLES=ON \
-D OPENCV_EXTRA_MODULES_PATH=~/opencv_contrib-3.4.1/modules \
-D BUILD_EXAMPLES=ON ..
```
```
sudo nano /etc/dphys-swapfile
```

***[find and switch out value]***
```
CONF_SWAPSIZE=1024
```

***[restart pi]*** <br/>
***[navigate to "opencv-3.4.1/build" directory]***
```
sudo make -j4
```
***[wait forever]***
```
sudo make install
sudo ldconfig
```

***[now we can confirm cv2 python bindings]*** <br/>
```
ls /usr/local/lib/python3.x/dist-packages
```


using python3
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTY1NTQzNDU3Ml19
-->
