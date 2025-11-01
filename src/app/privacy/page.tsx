const PrivacyPage = () => (
  <div className="bg-slate-50 py-16">
    <div className="mx-auto max-w-4xl space-y-6 rounded-3xl border border-slate-200 bg-white p-10 shadow-soft">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="text-sm text-slate-600">
        We collect the minimum amount of personal data required to process your orders. Customer
        details such as name, contact number, delivery address, and payment receipts are stored
        securely and only used for order fulfilment and verification.
      </p>
      <p className="text-sm text-slate-600">
        Payment receipts uploaded for eSewa and bank transfers are reviewed by our admin team to
        confirm successful payments. These records are retained for 90 days and then permanently
        deleted.
      </p>
      <p className="text-sm text-slate-600">
        We never share your information with third parties except our logistics partners who require
        delivery addresses and phone numbers to complete doorstep delivery.
      </p>
      <p className="text-sm text-slate-600">
        For any privacy concerns, please email{" "}
        <span className="font-semibold text-slate-800">privacy@nepaljerseyhub.com</span>.
      </p>
    </div>
  </div>
);

export default PrivacyPage;
