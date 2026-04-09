"use client";
import { useState, useRef } from "react";

const Field = ({
  value,
  onChange,
  editable,
  className = "",
  type = "text",
  placeholder = "",
}) => {
  if (!editable) return <span className={className}>{value}</span>;
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      className={`bg-transparent outline-none border-b border-dashed border-transparent hover:border-gray-300 focus:border-gray-500 transition w-full ${className}`}
    />
  );
};

export default function Quotation({ editable = false, initialData, onSave }) {
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState(() => {
    if (initialData) {
      return {
        ...initialData,
        dueDate:
          initialData.dueDate?.split?.("T")[0] || initialData.dueDate || "",
      };
    }
    return {
      companyName: "Your Business Name",
      companyPhone: "+92 300 0000000",
      companyEmail: "you@email.com",
      clientName: "Client Name",
      clientPhone: "+92 300 1111111",
      quoteNo: "QT-001",
      dueDate: new Date().toISOString().split("T")[0],
      validDays: 30,
      type: "quotation",
      items: [
        {
          description: "Service / Product",
          qty: "1",
          rate: "10000",
          amount: "10000",
        },
        {
          description: "Additional Work",
          qty: "2",
          rate: "5000",
          amount: "10000",
        },
      ],
      note: "Payment 50% advance, 50% on delivery.",
      signature: null,
    };
  });

  const fileInputRef = useRef(null);

  const set = (field, value) => setData((p) => ({ ...p, [field]: value }));
  const updateItem = (i, field, value) => {
    const items = [...data.items];
    items[i] = { ...items[i], [field]: value };
    if (field === "qty" || field === "rate") {
      items[i].amount = (
        (parseFloat(items[i].qty) || 0) * (parseFloat(items[i].rate) || 0)
      ).toString();
    }
    setData((p) => ({ ...p, items }));
  };

  const addItem = () =>
    setData((p) => ({
      ...p,
      items: [
        ...p.items,
        { description: "", qty: "1", rate: "0", amount: "0" },
      ],
    }));

  const removeItem = (i) =>
    setData((p) => ({ ...p, items: p.items.filter((_, idx) => idx !== i) })); // Auto-calculate total
  const total = data.items.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);
  const fmt = (n) => n.toLocaleString("en-IN");

  const removeSignature = () => set("signature", null);

  const handleSave = () => {
    onSave?.({ ...data, total });
  };

  const handleSignatureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "DocuMaker");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dt4qdszmp/image/upload`,
      { method: "POST", body: formData },
    );
    const Clouddata = await res.json();

    setData({ ...data, signature: Clouddata.secure_url });
    setLoading(false);
  };

  return (
    <div className="font-sans text-gray-800 bg-white text-sm p-4 sm:p-6">
      <div className="flex justify-between items-center gap-2 items-start mb-8">
        <div>
          <div className="text-base leading-6 sm:leading-normal sm:text-xl font-bold text-gray-900">
            <Field
              value={data.companyName}
              onChange={(v) => set("companyName", v)}
              editable={editable}
              placeholder="Your Business Name"
              className="text-xl font-bold"
            />
          </div>
          <div className="text-xs text-gray-400 mt-1">
            <Field
              value={data.companyPhone}
              onChange={(v) => set("companyPhone", v)}
              editable={editable}
              placeholder="Phone"
              className="text-xs text-gray-400"
            />
          </div>
          <div className="text-xs text-gray-400">
            <Field
              value={data.companyEmail}
              onChange={(v) => set("companyEmail", v)}
              editable={editable}
              placeholder="Email"
              className="text-xs text-gray-400"
            />
          </div>
        </div>

        <div className="text-right">
          <div className="text-base sm:text-2xl font-black uppercase tracking-widest text-gray-900">
            Quotation
          </div>
          <div className="text-xs text-gray-400 mt-1">
            <Field
              value={data.quoteNo}
              onChange={(v) => set("quoteNo", v)}
              editable={editable}
              className="text-xs text-gray-400 w-20 text-right"
              placeholder="QT-001"
            />
          </div>
          <div className="text-xs text-gray-400 mt-0.5">
            {" "}
            <Field
              value={data.dueDate}
              onChange={(v) => set("dueDate", v)}
              editable={editable}
              className="text-xs text-gray-400 text-right"
              placeholder="Date"
              type="date"
            />
          </div>
        </div>
      </div>

      <div className="border-t-2 border-gray-900 mb-6" />

      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">
          Quoted To
        </div>
        <div className="font-semibold text-gray-900">
          <Field
            value={data.clientName}
            onChange={(v) => set("clientName", v)}
            editable={editable}
            placeholder="Client Name"
            className="font-semibold"
          />
        </div>
        <div className="text-xs text-gray-400 mt-0.5">
          {" "}
          <Field
            value={data.clientPhone}
            onChange={(v) => set("clientPhone", v)}
            editable={editable}
            placeholder="Client Phone"
            className="text-xs text-gray-400"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="hidden sm:grid grid-cols-12 text-xs uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2 mb-1 gap-2">
          <span className="col-span-5">Description</span>
          <span className="col-span-2 text-center">Qty</span>
          <span className="col-span-2 text-right">Rate</span>
          <span className="col-span-3 text-right">Amount</span>
        </div>
        {data.items.map((item, i) => (
          <div key={i} className="group">
            <div className="hidden sm:grid grid-cols-12 items-center py-2 border-b border-gray-100 gap-2">
              <span className="col-span-5 pr-2 min-w-0">
                <Field
                  value={item.description}
                  onChange={(v) => updateItem(i, "description", v)}
                  editable={editable}
                  placeholder="Item or service"
                  className="truncate"
                />
              </span>
              <span className="col-span-2 text-center">
                {" "}
                <Field
                  value={item.qty}
                  onChange={(v) => updateItem(i, "qty", v)}
                  type="number"
                  editable={editable}
                  className="text-center w-full"
                />
              </span>
              <span className="col-span-2 text-right">
                <Field
                  value={item.rate}
                  onChange={(v) => updateItem(i, "rate", v)}
                  type="number"
                  editable={editable}
                  className="text-right w-full"
                />
              </span>
              <span className="col-span-3 text-right font-medium flex justify-end items-center gap-1">
                {fmt(parseFloat(item.amount) || 0)}
                {editable && (
                  <button
                    onClick={() => removeItem(i)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 text-xs ml-1 transition shrink-0"
                  >
                    ✕
                  </button>
                )}
              </span>
            </div>{" "}
            <div className="sm:hidden border-b border-gray-100 py-3">
              <div className="flex justify-between items-start gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <Field
                    value={item.description}
                    onChange={(v) => updateItem(i, "description", v)}
                    editable={editable}
                    placeholder="Item or service"
                    className="font-medium"
                  />
                </div>
                {editable && (
                  <button
                    onClick={() => removeItem(i)}
                    className="text-red-400 text-xs p-1 shrink-0"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                    Qty
                  </span>
                  <Field
                    value={item.qty}
                    onChange={(v) => updateItem(i, "qty", v)}
                    type="number"
                    editable={editable}
                    className="text-left"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                    Rate
                  </span>
                  <Field
                    value={item.rate}
                    onChange={(v) => updateItem(i, "rate", v)}
                    type="number"
                    editable={editable}
                    className="text-left"
                  />
                </div>{" "}
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                    Amount
                  </span>
                  <span className="font-semibold text-gray-900 break-all">
                    {fmt(parseFloat(item.amount) || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}{" "}
        {editable && (
          <button
            onClick={addItem}
            className="mt-3 text-xs text-gray-400 hover:text-gray-700 transition w-full sm:w-auto text-left"
          >
            + Add item
          </button>
        )}
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-48">
          <div className="flex justify-between items-center border-t-2 border-gray-900 pt-3">
            <span className="text-sm font-bold uppercase tracking-widest">
              Total
            </span>{" "}
            <span className="text-xl font-black text-gray-900">
              ₹{fmt(total)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg px-5 py-4 flex justify-between items-start gap-6 text-xs text-gray-500">
        <div className="flex-1">
          <div className="font-semibold text-gray-700 mb-1">Note</div>
          <Field
            value={data.note}
            onChange={(v) => set("note", v)}
            editable={editable}
            placeholder="Payment terms or any note..."
            className="text-xs text-gray-500 w-full"
          />
        </div>
        <div className="text-right shrink-0">
          <div className="font-semibold text-gray-700 mb-1">Valid For</div>
          <div className="flex items-center justify-end gap-1">
            <Field
              value={data.validDays}
              onChange={(v) => set("validDays", v)}
              type="Number"
              editable={editable}
              className="text-right w-8 text-xs"
            />{" "}
            <span>days</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-end">
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-gray-400 mb-3">
              Authorized Signature
            </div>

            {data.signature ? (
              <div className="relative w-48 h-20">
                {Loading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : data.signature ? (
                  <div className="relative group w-full h-full">
                    <img
                      src={data.signature}
                      alt="Signature"
                      className="w-full h-full object-contain rounded-lg"
                    />
                    {editable && (
                      <button
                        onClick={removeSignature}
                        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ) : editable ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5 text-gray-400 mb-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-xs text-gray-400">Add signature</span>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center border border-dashed border-gray-200 rounded-lg">
                    <span className="text-xs text-gray-300 italic">
                      No signature
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => editable && fileInputRef.current?.click()}
                className={`border-2 border-dashed border-gray-300 rounded-lg px-8 py-4 ${editable ? "cursor-pointer hover:border-gray-400 hover:bg-gray-50" : ""} transition`}
              >
                <div className="text-gray-400 text-xs">
                  {editable ? "Click to add signature / thumb" : "No signature"}
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleSignatureUpload(e);
              }}
              className="hidden"
            />
            <div className="mt-2 border-t border-gray-900 w-48 mx-auto" />
            <div className="text-xs text-gray-500 mt-1">{data.companyName}</div>
          </div>
        </div>
      </div>

      <div className="pt-14">
        <div className="border-t border-gray-100 flex justify-between items-center text-xs text-gray-300">
          <span>{data.companyName}</span>
          <span>Thank you for your business</span>
        </div>
      </div>
      {editable && (
        <button
          onClick={handleSave}
          className="mt-6 w-full bg-gray-900 text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition"
        >
          {" "}
          Save Quotation
        </button>
      )}
    </div>
  );
}
