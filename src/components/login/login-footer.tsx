const footerLinks = [
  ['About', ''],
  ['Help Center', ''],
  ['Privacy Policy', ''],
  ['Cookie Policy', ''],
  ['Accessibility', ''],
  [
    'Ads Info',
    ''
  ],
  ['Optimism', 'https://www.optimism.io/'],
  ['Zora', 'https://zora.co/'],
  ['Base', 'https://base.org/'],
  ['World Coin', 'https://worldcoin.org'],
  ['Hyperlane', 'https://hyperlane.xyz/'],
  ['Mode', 'https://mode.network/'],
  ['LayerZero', 'https://business.twitter.com'],
  ['ChainLink', 'https://chain.link/'],
  ['The Graph', 'https://thegraph.com/'],
  ['Ethereum Attestation Service', 'https://attest.sh/']
] as const;

export function LoginFooter(): JSX.Element {
  return (
    <footer className='hidden justify-center p-4 text-sm text-light-secondary dark:text-dark-secondary lg:flex'>
      <nav className='flex flex-wrap justify-center gap-4 gap-y-2'>
        {footerLinks.map(([linkName, href]) => (
          <a
            className='custom-underline'
            target='_blank'
            rel='noreferrer'
            href={href}
            key={linkName}
          >
            {linkName}
          </a>
        ))}
        <p>© 2023 EventEAS, Inc.</p>
      </nav>
    </footer>
  );
}
