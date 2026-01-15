from ultralytics import YOLO
from app.core.config import settings
from app.core.logging import log
import cv2
import numpy as np

class YOLOModel:
    def __init__(self):
        self.model = None
        self.load_model()

    def load_model(self):
        """
        Loads the YOLOv8 model from the path specified in settings.
        Handles errors gracefully to prevent app crash loop.
        """
        try:
            log.info(f"Loading YOLOv8 model from: {settings.MODEL_PATH}")
            self.model = YOLO(settings.MODEL_PATH)
            
            # Warm up
            # self.model.predict(np.zeros((640, 640, 3), dtype=np.uint8), verbose=False)
            log.success("Model loaded successfully! (Ready for Inference)")
        except Exception as e:
            log.critical(f"Failed to load model: {e}")
            self.model = None

    def predict(self, image_path: str, save_path: str = None):
        """
        Runs inference on the provided image path.
        Returns a list of clean dicts: [{'class': '20000', 'confidence': 0.95, 'bbox': [...]}]
        If save_path is provided, saves the annotated image there.
        """
        if not self.model:
            log.error("⚠️ Attempted prediction while model is offline.")
            return []

        try:
            if isinstance(image_path, str):
                log.debug(f"📐 Running inference on {image_path}")
            else:
                log.debug(f"📐 Running inference on in-memory image frame")
            
            results = self.model.predict(image_path, conf=settings.CONFIDENCE_THRESHOLD, verbose=False)
            
            clean_results = []
            total_value = 0
            
            for r in results:
                # Save annotated image if requested
                if save_path:
                    try:
                         # array in BGR format
                         annotated_frame = r.plot()
                         cv2.imwrite(save_path, annotated_frame)
                         log.info(f"💾 Annotation saved to {save_path}")
                    except Exception as img_err:
                        log.error(f"Failed to save annotation: {img_err}")

                names = r.names
                for box in r.boxes:
                    cls_id = int(box.cls[0])
                    raw_conf = float(box.conf[0])
                    class_name = names[cls_id]
                    
                    # Convert Tensor to standard List
                    bbox = box.xyxy[0].tolist() 
                    
                    # Calculate Total (Assuming class name is numeric like '20000')
                    try:
                         val = int(class_name)
                         total_value += val
                    except:
                        pass

                    detection = {
                        "class": class_name,
                        "class_id": cls_id,
                        "confidence": round(raw_conf, 2),
                        "bbox": [round(x, 1) for x in bbox] # Precision cleaning
                    }
                    clean_results.append(detection)
            
            if total_value > 0:
                log.success(f"Inference Success: {len(clean_results)} notes detected. Value: {total_value} Riel")
            else:
                log.warning(f"Inference Complete: No currency detected.")

            return {"detections": clean_results, "total_value": total_value}

        except Exception as e:
            log.exception(f"Inference error: {e}")
            return {"error": str(e)}

# Singleton Instance
# We instantiate this once so the model stays in memory (not reloading every request)
yolo_engine = YOLOModel()
