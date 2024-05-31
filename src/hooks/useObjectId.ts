import {useParams} from "react-router-dom";

export function useObjectId() {
  const { objectId } = useParams<{ objectId: string }>();

  if (!objectId) {
    throw new Error("Object ID not found");
  }

  return +objectId;
}
