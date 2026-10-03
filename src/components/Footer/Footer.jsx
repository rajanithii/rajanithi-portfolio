import { profile } from '../../data/profile';
import { scrollToTarget } from '../../hooks/useLenis';
import SmartLink from '../common/SmartLink';

export default function Footer() {
  return (
    <footer className="footer theme-dark">
      <div className="footer__row">
        <div>
          <p className="footer__name">{profile.name}</p>
          <p className="meta">{profile.role}</p>
        </div>
        <nav aria-label="Social links">
          <ul className="footer__links">
            {profile.social.map((l) => (
              <li key={l.label}>
                <SmartLink href={l.href}>{l.name}</SmartLink>
              </li>
            ))}
          </ul>
        </nav>
        <p className="meta">© 2026</p>
      </div>
      <button type="button" className="footer__top meta" onClick={() => scrollToTarget(0)}>
        BACK TO TOP ↑
      </button>
    </footer>
  );
}
