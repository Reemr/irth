import axios from "axios";

const INFER_URL = "https://irth-yolo-infer-xxxxx.a.run.app/infer";

export async function runInference(uri: string) {
  const form = new FormData();
  // @ts-ignore
  form.append("file", { uri, name: "image.jpg", type: "image/jpeg" });

  const res = await axios.post(INFER_URL, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.predictions;  // [{class, confidence, bbox}, ...]
}
