export default function Form() {
  return (
    <>
<section className="light formsec" id="start"><div className="in">
 <div className="svc-head"><h2>Tell us the idea</h2><p className="sub" style={{maxWidth:"28ch",margin:"0"}}>Two minutes to fill. We'll reply by email or WhatsApp.</p></div>
 <form id="cf" className="cf" noValidate>
  <label>Name<input type="text" name="name" required autoComplete="name"/></label>
  <label>Email<input type="email" name="email" required autoComplete="email"/></label>
  <label>Phone or WhatsApp<input type="tel" name="phone" autoComplete="tel"/></label>
  <label>Company or brand<input type="text" name="brand" autoComplete="organization"/></label>
  <fieldset><legend>What do you need?</legend><div className="chips">
   <label className="chip"><input type="radio" name="service" value="Software"/><span>Software</span></label>
   <label className="chip"><input type="radio" name="service" value="Digital Marketing"/><span>Digital Marketing</span></label>
   <label className="chip"><input type="radio" name="service" value="Branding"/><span>Branding</span></label>
   <label className="chip"><input type="radio" name="service" value="Not sure yet"/><span>Not sure yet</span></label></div></fieldset>
  <label className="wide">The idea<textarea name="message" rows={4} required></textarea></label>
  <input className="hp" type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
  <div className="act"><button type="submit">Send it</button><p id="cfs" role="status" aria-live="polite"></p></div>
 </form>
</div></section>


    </>
  );
}
