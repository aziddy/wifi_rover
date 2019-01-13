
#include <Servo.h>

Servo steeringServo;  
int incomingByte = 0;

void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
  pinMode(7, OUTPUT);
  pinMode(5, OUTPUT);
  steeringServo.attach(3);  // attaches the servo on pin 9 to the servo object
}

// the loop function runs over and over again forever
void loop() {


  // send data only when you receive data:
  if (Serial.available() > 0) {
          // read the incoming byte:
          incomingByte = Serial.read();
            steeringServo.write(63);  

          if(incomingByte == 119){
            Serial.println("w");
            steeringServo.write(93);
            digitalWrite(7, HIGH);   // turn the LED on (HIGH is the voltage level)
            delay(100);   
            digitalWrite(7, LOW); 
          } else if (incomingByte == 115){
            Serial.println("s");
             digitalWrite(5, HIGH);   // turn the LED on (HIGH is the voltage level)
             steeringServo.write(93);    
             delay(100);   
             digitalWrite(5, LOW); 
          } else if (incomingByte == 97){
            Serial.println("a");
            steeringServo.write(63);
            delay(200); 
            digitalWrite(7, HIGH);   // turn the LED on (HIGH is the voltage level)
            delay(250);   
            digitalWrite(7, LOW);   
          } else if (incomingByte == 100){
            Serial.println("d");
            steeringServo.write(117);
            delay(200); 
            digitalWrite(7, HIGH);   // turn the LED on (HIGH is the voltage level)
            delay(250);   
            digitalWrite(7, LOW);   
          }
          
  } else {
    
  }
/*
  delay(2000);  
  digitalWrite(12, HIGH);   // turn the LED on (HIGH is the voltage level)
  //steeringServo.write(117);    
  delay(2000);   
  digitalWrite(12, LOW); 
  delay(2000);  
*/
  
 // delay(1000);                       // wait for a second
//  digitalWrite(12, LOW);    // turn the LED off by making the voltage LOW
 // delay(1000);                       // wait for a second
}
