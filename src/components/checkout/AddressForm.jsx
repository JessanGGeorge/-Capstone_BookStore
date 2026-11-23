import { Input, Select } from '../ui/Fields.jsx';

export const emptyAddress = {
  firstName: '', lastName: '', line: '', email: '', city: '', pin: '', dial: '+91', phone: '', state: '', country: 'India',
};

export function validateAddress(a) {
  const e = {};
  if (!a.firstName.trim()) e.firstName = 'Required';
  if (!a.line.trim()) e.line = 'Required';
  if (!/\S+@\S+\.\S+/.test(a.email)) e.email = 'Valid e-mail required';
  if (!a.city.trim()) e.city = 'Required';
  if (!/^\d{6}$/.test(a.pin)) e.pin = '6-digit PIN';
  if (!/^\d{10}$/.test(a.phone)) e.phone = '10 digits';
  if (!a.state.trim()) e.state = 'Required';
  return e;
}

const SAVED = {
  firstName: 'Asha', lastName: 'Rao', line: '12 MG Road', email: 'asha@example.com',
  city: 'Bengaluru', pin: '560001', dial: '+91', phone: '9876543210', state: 'Karnataka', country: 'India',
};

export default function AddressForm({ value, onChange, errors = {}, defaultName }) {
  const set = (k) => (e) => onChange({ ...value, [k]: e.target.value });
  const err = (k) => errors[k] && <span className="text-[11px] text-red-400">{errors[k]}</span>;

  return (
    <div>
      <label className="mb-3 flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          onChange={(e) => onChange(e.target.checked ? { ...SAVED, firstName: defaultName && defaultName !== 'Guest' ? defaultName : SAVED.firstName } : { ...emptyAddress })}
        />
        Use Saved Address
      </label>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div><Input id="fn" label="First Name" placeholder="First Name" value={value.firstName} onChange={set('firstName')} />{err('firstName')}</div>
        <div><Input id="ln" label="Last Name" placeholder="Last Name" value={value.lastName} onChange={set('lastName')} /></div>
        <div><Input id="addr" label="Address" placeholder="Address Line" value={value.line} onChange={set('line')} />{err('line')}</div>

        <div className="sm:col-span-2 lg:col-span-1"><Input id="em" label="e-mail" type="email" placeholder="e-mail" value={value.email} onChange={set('email')} />{err('email')}</div>
        <div><Input id="city" label="City" placeholder="City" value={value.city} onChange={set('city')} />{err('city')}</div>
        <div><Input id="pin" label="Pin" placeholder="000000" inputMode="numeric" maxLength={6} value={value.pin} onChange={set('pin')} />{err('pin')}</div>

        <div className="flex gap-2 sm:col-span-2 lg:col-span-1">
          <Select id="dial" label="Phone Number" options={['+91', '+1', '+44']} value={value.dial} onChange={set('dial')} className="w-24" />
          <div className="flex-1"><Input id="ph" label="&nbsp;" placeholder="1234567890" inputMode="numeric" maxLength={10} value={value.phone} onChange={set('phone')} />{err('phone')}</div>
        </div>
        <div><Input id="st" label="State" placeholder="State" value={value.state} onChange={set('state')} />{err('state')}</div>
        <div><Select id="co" label="Country" options={['India', 'United States', 'United Kingdom']} value={value.country} onChange={set('country')} /></div>
      </div>
    </div>
  );
}
