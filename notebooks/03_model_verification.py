import os
import cv2
import pandas as pd
import matplotlib.pyplot as plt
from ultralytics import YOLO
import random
from pathlib import Path

# --- Configuration ---
PROJECT_ROOT = r"D:\I5\advance_programming\CamCurrencyProject"
MODEL_PATH = os.path.join(PROJECT_ROOT, "CurrencyFullStack", "notebooks", "models_backup", "best_riel_master.pt")
TEST_IMAGES_DIR = os.path.join(PROJECT_ROOT, "CurrencyFullStack", "notebooks", "dataset_export", "test", "images")
RESULTS_DIR = os.path.join(PROJECT_ROOT, "verification_results_riel_master")
CSV_PATH = os.path.join(PROJECT_ROOT, "CurrencyFullStack", "notebooks", "models_backup", "results_riel_master.csv")

# Create results folder
if not os.path.exists(RESULTS_DIR):
    os.makedirs(RESULTS_DIR)

# 1. Load Model
print(f"🔄 Loading model from {MODEL_PATH}...")
model = YOLO(MODEL_PATH)
print("✅ Model loaded.")

# 2. Run Inference on Test Images
print(f"🏃 Running inference on random samples from {TEST_IMAGES_DIR}...")
all_test_images = list(Path(TEST_IMAGES_DIR).glob("*.jpg")) + list(Path(TEST_IMAGES_DIR).glob("*.png")) + list(Path(TEST_IMAGES_DIR).glob("*.jpeg"))

if not all_test_images:
    print("❌ No test images found.")
else:
    # Pick 5 random images
    samples = random.sample(all_test_images, min(5, len(all_test_images)))
    
    for img_path in samples:
        results = model.predict(str(img_path), conf=0.25)
        
        for r in results:
            # Save plotted image
            save_name = f"pred_{img_path.name}"
            save_path = os.path.join(RESULTS_DIR, save_name)
            r.save(filename=save_path)
            
            # Print Detections
            print(f"\n📄 Image: {img_path.name}")
            for box in r.boxes:
                cls_id = int(box.cls[0])
                conf = float(box.conf[0])
                cls_name = model.names[cls_id]
                print(f"  👉 Detected: {cls_name} (Conf: {conf:.2f})")
    
    print(f"\n✅ Visual results saved to: {RESULTS_DIR}")

# 3. Analyze Training History (from CSV)
if os.path.exists(CSV_PATH):
    print("\n📊 Analyzing Training History...")
    df = pd.read_csv(CSV_PATH)
    
    # Strip whitespace from column names just in case
    df.columns = [c.strip() for c in df.columns]
    
    epochs = df['epoch']
    map50 = df['metrics/mAP50(B)']
    map50_95 = df['metrics/mAP50-95(B)']
    
    plt.figure(figsize=(10, 6))
    plt.plot(epochs, map50, label='mAP@50')
    plt.plot(epochs, map50_95, label='mAP@50-95')
    plt.xlabel('Epochs')
    plt.ylabel('mAP')
    plt.title('Training Accuracy Progress (mAP)')
    plt.legend()
    plt.grid(True)
    
    chart_path = os.path.join(RESULTS_DIR, "training_accuracy_chart.png")
    plt.savefig(chart_path)
    print(f"✅ Training accuracy chart saved to: {chart_path}")
    print(f"🏆 Final mAP@50: {map50.iloc[-1]:.4f}")
    print(f"🏆 Final mAP@50-95: {map50_95.iloc[-1]:.4f}")
else:
    print("⚠️ Results.csv not found, skipping chart.")
