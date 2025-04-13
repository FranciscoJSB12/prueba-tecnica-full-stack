import type { RechargeWalletReqDto } from 'src/shared/dtos/wallets/recharge-wallet-req.dto';
import type { WalletBalanceReqDto } from 'src/shared/dtos/wallets/wallet-balance-req.dto';
import type { WalletBalanceAxiosRes } from 'src/shared/types/wallets/wallet-balance-axios-res.type';
import type { WalletRechargeAxiosRes } from 'src/shared/types/wallets/wallet-recharge-axios-res.type';

export interface IWalletAdapter {
  rechargeWallet(
    rechargeWalletDto: RechargeWalletReqDto,
  ): Promise<WalletRechargeAxiosRes>;

  getBalance(
    walletBalanceReqDto: WalletBalanceReqDto,
  ): Promise<WalletBalanceAxiosRes>;
}
