export class RedirectInfoDTO {
  url: string;
  method: string;
  headers?: Record<string, string>; // Optional, assuming headers might not always be present
  data?: Record<string, string>; // Optional, assuming data might not always be present
}

export class InstrumentResponseDTO {
  type: string;
  redirectInfo: RedirectInfoDTO;
}

export class PaymentDataDTO {
  merchantId: string;
  merchantTransactionId: string;
  transactionId?: string; // Optional, since it may not always be available
  instrumentResponse: InstrumentResponseDTO;
}

export class PaymentResponseDTO {
  success: boolean;
  code: string;
  message: string;
  data: PaymentDataDTO;
}

export class ReturnDataDTO {
  returnReason: string;
  returnComment: string;
}

export class CancellationDataDTO {
  cancellationReason: string;
  cancellationComment: string;
}
