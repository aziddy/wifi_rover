import socketio
import urllib3
import cv2
import base64
import numpy
import serial



ser = None
good_serial_open = True


sio = socketio.Client()

@sio.on('connect')
def on_connect():
    print('Im connected!')

@sio.on('my message')
def on_message(data):
    print('I received a custom message!')

@sio.on('disconnect')
def on_disconnect():
    print('Im disconnected!')
    
    


@sio.on('foward')
def on_foward(data):
    #print('Foward')
    ser.write(b'w')
    
@sio.on('backward')
def on_backward(data):
    #print('Backward')
    ser.write(b's')
    
@sio.on('left')
def on_left(data):
    #print('Left')
    ser.write(b'a')
    
@sio.on('right')
def on_right(data):
    #print('Right')
    ser.write(b'd')



try:
	ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1) 
	
except:
	print("serial Error")
	good_serial_open = False

if good_serial_open:
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
