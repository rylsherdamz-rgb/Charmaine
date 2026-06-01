import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";

type StatusType = "idle" | "success" | "canceled" | "failed";

export default function useDocumentPicker() {
  const [document, setDocument] = useState<DocumentPicker.DocumentPickerSuccessResult | null>(null);
  const [status, setStatus] = useState<StatusType>("idle");

  async function getDocument() {
    try {
      const item = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: false,
        copyToCacheDirectory: true
      });

      if (item.canceled) {
        setStatus("canceled");
        setDocument(null);
        return;
      }

      setStatus("success");
      setDocument(item);

    } catch (error) {
      setStatus("failed");
      setDocument(null);
    }
  }

  return {
    document,
    status,
    getDocument,
  };
}

