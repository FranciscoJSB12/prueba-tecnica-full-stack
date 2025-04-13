import type { RechargeWalletDto } from 'src/shared/dtos/wallets/recharge-wallet.dto';
import type { WalletBalanceReqDto } from 'src/shared/dtos/wallets/wallet-balance-req.dto';
import type { WalletBalanceExtRes } from 'src/shared/types/wallets/wallet-balance-ext-res.type';
import type { WalletRechargeExtRes } from 'src/shared/types/wallets/wallet-recharge-ext-res.type';

export interface IWalletAdapter {
  rechargeWallet(
    rechargeWalletDto: RechargeWalletDto,
  ): Promise<WalletRechargeExtRes>;

  getBalance(
    walletBalanceReqDto: WalletBalanceReqDto,
  ): Promise<WalletBalanceExtRes>;
}
