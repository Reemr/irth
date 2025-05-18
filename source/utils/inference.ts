// source/utils/inference.ts
import { PREDICT_URL } from "../constants/apiRoutes";

export interface Prediction {
  boxes: number[][];
  confidences: number[];
  classes: number[];
}

export async function predictArtifact(
  uri: string,
  fileName: string,
  mimeType: string
): Promise<Prediction> {
  const formData = new FormData();
  formData.append(
    "image",
    { uri, name: fileName, type: mimeType } as any
  );

  const res = await fetch(PREDICT_URL, {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Inference failed: ${res.status} ${text}`);
  }
  return (await res.json()) as Prediction;
}