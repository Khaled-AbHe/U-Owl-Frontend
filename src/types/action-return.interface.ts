export default interface ActionReturnMessage {
  type: "success" | "error" | undefined;
  message: string;
}
