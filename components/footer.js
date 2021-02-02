import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

export default function Footer() {
  return (
    <>
    <div style={{ textAlign: 'center' }}>
      <Typography>Made with ♡ by <a href="https://www.tiktok.com/@benthamite">@benthamite</a> •{' '}
      <a href="https://github.com/xodarap">GitHub</a> •{' '}
      Skincare creators you should follow: {' '}
      {['janellyskin', 'davislake_', 'whatyouneedtoknow'].map(name => <Link key={name} href="https://www.tiktok.com/@{name}">@{name}</Link>).reduce((accu, elem) => {
            return accu === null ? [elem] : [...accu, <span> • </span>, elem]
        }, null)}
        </Typography>
    </div>
    </>
  )
}