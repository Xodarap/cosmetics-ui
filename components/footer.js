import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

export default function Footer() {
  return (
    <>
    <div style={{ textAlign: 'center' }}>
      <Typography>Made with ♡ by <a href="https://www.tiktok.com/@benthamite">@benthamite</a> •{' '}
      <a href="https://github.com/xodarap">GitHub</a> •{' '}
      Skincare gurus you should follow: {' '}
      {['janellyskin', 'davislake_', 'whatyouneedtoknow'].map(name => <Link key={name} href="https://www.tiktok.com/@{name}">@{name}</Link>).reduce((accu, elem) => {
            return accu === null ? [elem] : [...accu, <span> • </span>, elem]
        }, null)}
        </Typography>
    </div>
    </>
  )
}

/*
when duration between 1000 and 5000 then '1-5' 
when duration between 5000 and 10000 then '5-10' 
when duration between 10000 and 15000 then '10-15' 
when duration between 15000 and 20000 then '15-20' 
when duration between 20000 and 25000 then '20-25' 
when duration between 25000 and 30000 then '25-30' 
when duration between 30000 and 35000 then '30-35' 
when duration between 35000 and 40000 then '35-40' 
when duration between 40000 and 45000 then '40-45' 
when duration between 45000 and 50000 then '45-50' 
when duration between 50000 and 55000 then '50-55' 
when duration between 55000 and 60000 then '55-60' 
*/