#step1:-To capture the video using cv2
#stea2:-To detect the hand
#step3:-To seprate index finger from other.
#step4:-To move mouse by finger using Pyautogui.
#step5:-To perform click operation.

#future implant:-Click using keys to click easily.

import pyautogui
import mediapipe as mp
import cv2

#0 define primary camera which is front one to capture image.
a=cv2.VideoCapture(0)
#to detect hands.
hand_detector=mp.solutions.hands.Hands()
drawing_utils =mp.solutions.drawing_utils
screen_width,screen_height=pyautogui.size()
index_y=0
while True:
    #
    _, frame = a.read()
    #flip the mirror image in frame (1 means in Y axis.)
    frame=cv2.flip(frame, 1)
    #To get dimension of screen
    frame_height,frame_weidth, _=frame.shape
    #converting color of frame using cv2.BGR2RGB.rgb=red,green,blue.(COLOR Error occured).
    rgb_frame= cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    #taking output from rgb_frame as coordinates.
    output=hand_detector.process(rgb_frame)
    #To match hand coordinates with landmarks of fingers.
    hands=output.multi_hand_landmarks
    #to show landmark points on hand.
    if hands:
        for hand in hands:
            drawing_utils.draw_landmarks(frame, hand)
            landmarks=hand.landmark
            #to set id to landmarks ex:-1,2,3,4,5 & etc.
            for id, landmark in enumerate(landmarks):
                #Multiplying to get coordintes accordind to frame.
                x=int(landmark.x*frame_weidth)
                y=int(landmark.y*frame_height)
                #print(x,y)
                #To make index finger unique.
                if id==8:
                    cv2.circle(img=frame,center=(x,y),radius=10,color=(0,255,255))
                    #To move mouse in whole screen
                    index_x=screen_width/frame_weidth*x
                    index_y=screen_height/frame_height*y
                    # To move mouse.
                    pyautogui.moveTo(index_x, index_y)
                if id==4:
                    cv2.circle(img=frame,center=(x,y),radius=10,color=(0,255,255))
                    #To move mouse in whole screen
                    thumb_x=screen_width/frame_weidth*x
                    thumb_y=screen_height/frame_height*y
                    #To click with gap of fingers.
                  # print("Gap:",abs(index_y-thumb_y))
                    #if abs(index_y-thumb_y)<20:
                    if s == ord('c'):
                        pyautogui.click()
                        pyautogui.sleep(1)
    cv2.imshow("Mouse Ai",frame)
    s = cv2.waitKey(1) & 0xFF
    if s == ord('s'):
        break

cv2.destroyAllWindows
