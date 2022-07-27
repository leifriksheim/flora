import cv2
import sys

VIDEO_URL = "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"

cap = cv2.VideoCapture(VIDEO_URL)
if (cap.isOpened() == False):
    print('!!! Unable to open URL')
    sys.exit(-1)

# retrieve FPS and calculate how long to wait between each frame to be display
fps = cap.get(cv2.CAP_PROP_FPS)
wait_ms = int(10000/fps)
print('FPS:', fps)

while(True):
    # read one frame
    ret, frame = cap.read()

    print('Frame')

    # TODO: perform frame processing here

    # display frame
    cv2.imshow('frame', frame)
    if cv2.waitKey(wait_ms) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
