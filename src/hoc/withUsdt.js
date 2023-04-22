import LINK from '../assets/icons/LINK.svg'
import LOGO from '../assets/icons/logo.svg'
const withUsdt = Usdt => props => {
    const usdt2 =
        [
            {
                imgurl:LINK,
                uname: 'TRON-USDT',
                bridge: 'TAthDkYifbo1GrbVLXq8MsSqcjqDTgtXbR',
                erc20: 'TMw3vT2zwWa5vomcqXgcQb3XCfac5kemKe'
            }
        ]
    const usdt1 = [
        {
            imgurl:'https://chainhop.s3.us-west-2.amazonaws.com/icons/ETH.png',
            uname: 'ETH-USDT',
            bridge: '0x99155bCcF403D838F2F643F66450c616F7d2c2A3',
            erc20: '0xA96039f8038899F023f73c55E81C57B8Ab06e7DB'
        }
    ]
    const usdt_xfs = [
        {
            imgurl:LOGO,
            uname: 'XFS-USDT',
            bridge: 'V1S9vhGENSkoMrSzjuGts8AB6DNXjYQsq',
            erc20: 'mvYLn5MD8r7VeJGdHbDbxsQhJ4qSEuz67'
        }
    ]
        return (
            <Usdt {...props} usdt1={usdt1} usdt2={usdt2} usdt_xfs={usdt_xfs}/>
        )
}
export default withUsdt;