package sdk

import (
    "github.com/yourusername/wallet"
)

type GoSDK struct {
    wallet            *wallet.Wallet
    kyc *wallet.KYC
    transactionHistory *wallet.TransactionHistory
}

func NewGoSDK(kycApiUrl string) *GoSDK {
    return &GoSDK{
        wallet:            wallet.NewWallet(),
        kyc:               wallet.NewKYC(kycApiUrl),
        transactionHistory: wallet.NewTransactionHistory(),
    }
}

func (sdk *GoSDK) CreateWallet() string {
    return sdk.wallet.CreateWallet()
}

func (sdk *GoSDK) ImportWallet(privateKey string) string {
    return sdk.wallet.ImportWallet(privateKey)
}

func (sdk *GoSDK) SubmitKYC(userData wallet.UserData) error {
    return sdk.kyc.SubmitKYC(userData)
}

func (sdk *GoSDK) GetTransactionHistory() []wallet.Transaction {
    return sdk.transactionHistory.GetHistory()
}

func (sdk *GoSDK) AddTransaction(transaction wallet.Transaction) {
    sdk.transactionHistory.AddTransaction(transaction)
}
