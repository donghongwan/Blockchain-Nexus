pub struct RustSDK {
    wallet: Wallet,
    kyc: KYC,
    transaction_history: TransactionHistory,
}

impl RustSDK {
    pub fn new(kyc_api_url: &str) -> Self {
        RustSDK {
            wallet: Wallet::new(),
            kyc: KYC::new(kyc_api_url),
            transaction_history: TransactionHistory::new(),
        }
    }

    pub fn create_wallet(&self) -> String {
        self.wallet.create_wallet()
    }

    pub fn import_wallet(&self, private_key: &str) -> String {
        self.wallet.import_wallet(private_key)
    }

    pub fn submit_kyc(&self, user_data: UserData) -> Result<(), String> {
        self.kyc.submit_kyc(user_data)
    }

    pub fn get_transaction_history(&self) -> Vec<Transaction> {
        self.transaction_history.get_history()
    }

    pub fn add_transaction(&self, transaction: Transaction) {
        self.transaction_history.add_transaction(transaction)
    }
}
