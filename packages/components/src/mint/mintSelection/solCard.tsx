import { util, useWalletBalance } from '@sentre/senhub'
import { utilsBN } from '@sen-use/web3'

import { Card, Col, Row, Space, Typography } from 'antd'
import { MintAvatar, MintName, MintSymbol } from '../index'
import { MintCardActions, Verification } from './mintCard'

import { useJupiterTokens } from './hooks/useJupiterTokens'

export const SOL_ADDRESS = '11111111111111111111111111111111'
export const SOL_DECIMALS = 9
export const DEFAULT_FORMAT_NUMRIC = '0,0.[000]'

export type SolCardProps = {
  onClick?: (mintAddress: string) => void
}
const SolCard = ({ onClick = () => {} }: SolCardProps) => {
  const jptTokens = useJupiterTokens()
  const lamports = useWalletBalance()
  const solBalance = utilsBN.undecimalize(lamports, SOL_DECIMALS)

  const formatNumric = (value: string | number, format?: string) =>
    util.numeric(value).format(format || DEFAULT_FORMAT_NUMRIC)

  return (
    <Card
      bodyStyle={{ padding: 8 }}
      style={{
        boxShadow: 'unset',
        cursor: 'pointer',
        background:
          'linear-gradient(269.1deg, rgba(0, 255, 163, 0.1) 0%, rgba(220, 31, 255, 0.1) 100%)',
        borderRadius: 8,
      }}
      bordered={false}
      onClick={() => onClick(SOL_ADDRESS)}
    >
      <Row gutter={[16, 16]}>
        <Col>
          <MintAvatar mintAddress={SOL_ADDRESS} size={36} />
        </Col>
        <Col>
          <Space direction="vertical" size={0}>
            {/* Mint symbol */}
            <Space>
              <Typography.Text>
                <MintSymbol mintAddress={SOL_ADDRESS} />
              </Typography.Text>
              {jptTokens?.verify(SOL_ADDRESS) && <Verification />}
            </Space>
            {/* Mint name */}
            <Typography.Text type="secondary" className="caption">
              <MintName mintAddress={SOL_ADDRESS} />
            </Typography.Text>
          </Space>
        </Col>
        <Col flex="auto" style={{ textAlign: 'right' }}>
          <Space align="start">
            <Typography.Text style={{ color: ' #03e1ff' }}>◎</Typography.Text>
            <Typography.Text className="caption">
              {formatNumric(solBalance)}
            </Typography.Text>
            {/*  Button open explorer */}
            <MintCardActions address={SOL_ADDRESS} />
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default SolCard
