import { Store } from "@tanstack/react-store";

// Access key'i saklamak için bir store oluştur
const accessKeyStore = new Store<string | null>(null);

export function useAccessKey() {
  return accessKeyStore;
}
