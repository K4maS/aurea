(() => {
  document.documentElement.classList.add('js-ready');
  const header = document.querySelector('[data-header]');
  const progress = document.querySelector('.scroll-progress span');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 24);
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  };
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  const closeMenu = () => {
    toggle?.setAttribute('aria-expanded', 'false');
    menu?.classList.remove('open');
    menu?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu?.classList.toggle('open', !open);
    menu?.setAttribute('aria-hidden', String(open));
    document.body.classList.toggle('menu-open', !open);
  });
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  if (!reduced && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: .9, ease: 'power3.out',
        delay: Math.min(i % 3, 2) * .04,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });
    gsap.to('.liquid-fallback span:nth-child(1)', { yPercent: 16, xPercent: -8, ease: 'none', scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true} });
    gsap.to('.hero-title', { yPercent: 10, ease: 'none', scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true} });
  } else {
    document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
  }

  if (!reduced && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * .12;
        const y = (e.clientY - r.top - r.height / 2) * .12;
        el.style.transform = `translate(${x}px,${y}px)`;
      });
      el.addEventListener('mouseleave', () => el.style.transform = '');
    });
  }
})();
