from ultralytics import YOLO
import cv2
import os

# Load model once
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "best.pt")
model = YOLO(MODEL_PATH)

def run_inference(image_path, filename):
    results = model(image_path)[0]
    
    detections = []
    
    for box in results.boxes:
        cls_id = int(box.cls[0])
        conf = float(box.conf[0])
        name = model.names[cls_id]
        
        # Try to parse integer value from name (e.g. "2000" -> 2000)
        try:
            value = int(name)
        except:
            value = 0 # Fallback
            
        detections.append({
            "class": name,
            "confidence": conf,
            "value": value,
            "box": box.xyxy[0].tolist()
        })
        
    # Optional: Save annotated image if needed, or return bbox for frontend to convert
    # For now, let's accept we have the data.
    
    return detections, image_path
