import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createPDB, useWalletAddress } from '@sentre/senhub'
import { MintSelection, NFTSelection, searchNFTType } from '@sen-use/components'

import { Row, Col, Typography, Button, Space } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { AppDispatch, AppState } from 'model'
import { increaseCounter } from 'model/main.controller'

import configs from 'configs'

const {
  manifest: { appId },
} = configs

const View = () => {
  const walletAddress = useWalletAddress()
  const dispatch = useDispatch<AppDispatch>()
  const { counter } = useSelector((state: AppState) => state.main)

  const pdb = useMemo(() => createPDB(walletAddress, appId), [walletAddress])
  const increase = useCallback(() => dispatch(increaseCounter()), [dispatch])
  useEffect(() => {
    if (pdb) pdb.setItem('counter', counter)
  }, [pdb, counter])

  return (
    <Row gutter={[24, 24]} align="middle">
      <Col span={24}>
        <Space align="center">
          <IonIcon name="newspaper-outline" />
          <Typography.Title level={4}>App View</Typography.Title>
        </Space>
      </Col>
      <Col span={24}>
        <Typography.Text>Address: {walletAddress}</Typography.Text>
      </Col>
      <Col>
        <Typography.Text>Counter: {counter}</Typography.Text>
      </Col>
      <Col>
        <Button onClick={increase}>Increase</Button>
      </Col>
      <MintSelection nativeSol />
      <NFTSelection />
      <NFTSelection
        searchNFTby={searchNFTType.collections}
        title="Select NFT collection"
      />
    </Row>
  )
}

export default View
