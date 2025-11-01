const TermsPage = () => (
  <div className="bg-slate-50 py-16">
    <div className="mx-auto max-w-4xl space-y-6 rounded-3xl border border-slate-200 bg-white p-10 shadow-soft">
      <h1 className="text-3xl font-bold text-slate-900">Terms &amp; Conditions</h1>
      <ol className="list-decimal space-y-3 pl-5 text-sm text-slate-600">
        <li>
          All jerseys are 100% authentic and inspected before dispatch. Exchanges are accepted within
          7 days if tags are intact and the product is unused.
        </li>
        <li>
          Cash on Delivery orders require customer availability at the provided address. Failed COD
          attempts may result in additional delivery charges.
        </li>
        <li>
          Digital payments via eSewa or bank transfer must include the order ID or customer name in
          the remarks. Receipts must be uploaded during checkout.
        </li>
        <li>
          Orders are dispatched within 24 hours of admin verification. Delivery timelines are 1-2
          days inside Kathmandu Valley and 3-5 days outside the valley.
        </li>
        <li>
          Nepal Jersey Hub reserves the right to cancel orders in cases of suspected fraudulent
          activity or unavailable stock. Customers will be notified immediately with refund options.
        </li>
      </ol>
      <p className="text-sm text-slate-600">
        Contact <span className="font-semibold text-slate-800">support@nepaljerseyhub.com</span> for
        clarifications.
      </p>
    </div>
  </div>
);

export default TermsPage;
