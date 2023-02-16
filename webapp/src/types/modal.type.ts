export type ModalsNames =
  | 'AddFundsCashAccount'
  | 'ConfirmDeleteCashAccount'
  | 'CreateCashAccount'
  | 'ManageCashAccount'
  | 'RenameCashAccount';

export type Modal<Props> = Props & {
  closeModal: () => void;
  openModal: <OpenModalProps>(name: ModalsNames, props?: OpenModalProps) => void;
};
