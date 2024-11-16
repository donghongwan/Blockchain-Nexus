import java.util.List;

public class JavaSDK {
    private Wallet wallet;
    private KYC kyc;
    private TransactionHistory transactionHistory;

    public JavaSDK(String kycApiUrl) {
        this.wallet = new Wallet();
        this.kyc = new KYC(kycApiUrl);
        this.transactionHistory = new TransactionHistory();
    }

    public String createWallet() {
        return wallet.createWallet();
    }

    public String importWallet(String privateKey) {
        return wallet.importWallet(privateKey);
    }

    public String submitKYC(UserData userData) {
        return kyc.submitKYC(userData);
    }

    public List<Transaction> getTransactionHistory() {
        return transactionHistory.getHistory();
    }

    public void addTransaction(Transaction transaction) {
        transactionHistory.addTransaction(transaction);
    }
}
