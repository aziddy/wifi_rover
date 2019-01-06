import socketio
import urllib3
import cv2
import base64
import numpy

# standard Python
sio = socketio.Client()

@sio.on('connect')
def on_connect():
    print('Im connected!')

@sio.on('message')
def on_message(data):
    print('I received a message!')

@sio.on('my message')
def on_message(data):
    print('I received a custom message!')

@sio.on('disconnect')
def on_disconnect():
    print('Im disconnected!')
    
    


@sio.on('foward')
def on_foward(data):
    print('Foward')
    
@sio.on('backward')
def on_backward(data):
    print('Backward')
    
@sio.on('left')
def on_left(data):
    print('Left')
    
@sio.on('right')
def on_right(data):
    print('Right')

    
sio.connect('http://198.50.245.94:5555')
sio.emit("initPi")

cap = cv2.VideoCapture(0)
print("Video Started")
while True:
	retval, frame = cap.read()
	encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 30]
	retval, buffer = cv2.imencode(".jpg", frame, encode_param)
	b64image = base64.b64encode(buffer).decode()
	sio.emit("video",("data:image/jpeg;base64,"+b64image))
