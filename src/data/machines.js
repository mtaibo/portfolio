// What each machine really imports and prints, shared by the home page and the Dotfiles page.
export const HOSTS = [['macbook', -330], ['desktop', 0], ['tphome', 330]]
export const ROWS = [
  [['zsh', 0, 1, 2]], [['starship', 0, 1, 2]], [['neovim', 0, 1, 2]], [['fastfetch', 0, 1, 2]],
  [['kitty', 0, 1]], [['vscode', 0, 1]],
  [['colima', 0, true], ['hyprland', 1, true]], [['nvidia', 1, true]],
]
export const MACHINE = {
  macbook: {
    lines: ['sudo darwin-rebuild switch --flake ~/Dotfiles#macbook', 'building the system configuration...', 'activating home-manager configuration for migueltaibo', 'setting up Kitty icon and ⌘K shortcut', 'macbook is up to date'],
    info: [['os', 'macOS'], ['shell', 'zsh'], ['term', 'kitty'], ['editor', 'neovim']],
    flake: ['darwinConfigurations.macbook', '  → hosts/macbook', '  → modules/home  (shared)'],
  },
  desktop: {
    lines: ['sudo nixos-rebuild switch --flake ~/dotfiles#desktop', 'building Hyprland, NVIDIA and GRUB theme...', 'activating the configuration...', 'restarting sddm.service', 'desktop is up to date'],
    info: [['os', 'NixOS'], ['wm', 'Hyprland'], ['shell', 'zsh'], ['term', 'kitty']],
    flake: ['nixosConfigurations.desktop', '  → hosts/desktop', '  → modules/home  (shared)'],
  },
  tphome: {
    lines: ['home-manager switch --flake ~/dotfiles#tphome', 'fetching SSH keys from github.com/mtaibo.keys', 'checking dnsmasq for tp.home', 'linking zsh, starship and neovim', 'tphome is up to date'],
    info: [['os', 'Raspberry Pi OS'], ['shell', 'zsh'], ['prompt', 'starship'], ['editor', 'neovim']],
    flake: ['homeConfigurations.tphome', '  → hosts/tphome', '  → shell + nvim subset'],
  },
}
