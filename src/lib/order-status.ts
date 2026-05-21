export const ORDER_STATUS_FLOW = [
  { value: "NEW", label: "Sipariş Alındı" },
  { value: "CONFIRMED", label: "İncelemede" },
  { value: "PRODUCTION", label: "Baskıda" },
  { value: "SHIPPED", label: "Kargoda" },
  { value: "DELIVERED", label: "Teslim Edildi" }
] as const;

export const ORDER_STATUS_CANCELLED = { value: "CANCELLED", label: "İptal" } as const;

export type OrderStatusValue =
  | (typeof ORDER_STATUS_FLOW)[number]["value"]
  | typeof ORDER_STATUS_CANCELLED.value;

export const ORDER_STATUS_OPTIONS = [...ORDER_STATUS_FLOW, ORDER_STATUS_CANCELLED];

const LABEL_BY_VALUE = Object.fromEntries(ORDER_STATUS_OPTIONS.map((item) => [item.value, item.label])) as Record<
  string,
  string
>;

export function getOrderStatusLabel(status: string) {
  return LABEL_BY_VALUE[status] ?? status;
}

export function getOrderStatusStepIndex(status: string) {
  return ORDER_STATUS_FLOW.findIndex((step) => step.value === status);
}
