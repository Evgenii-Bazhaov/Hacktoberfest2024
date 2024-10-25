"use client"

import { useEffect, useState } from "react"
import { ethers, type Contract, type Eip1193Provider } from "ethers"

import { ContractABI, ContractAddress } from "@/lib/contract"

import { Button } from "./ui/button"
import { toast } from "./ui/use-toast"

export const ConnectMetamask = () => {
  const [account, setAccount] = useState<string | null>(null)
  const [contract, setContract] = useState<Contract | null>(null)
  const [votesStatus, setVotesStatus] = useState<any[]>([])

  async function connect() {
    if (!window.ethereum) return

    const accounts = await window.ethereum.request?.({
      method: "eth_requestAccounts",
    })
    setAccount(accounts[0])

    const provider = new ethers.BrowserProvider(
      window.ethereum as Eip1193Provider
    )
    const signer = await provider.getSigner()
    const contractApple = new ethers.Contract(
      ContractAddress,
      ContractABI,
      signer
    )
    setContract(contractApple)
  }

  async function getVotes() {
    if (!contract) return
    const data = [
      await contract?.getCandidate(0),
      await contract?.getCandidate(1),
      await contract?.getCandidate(2),
    ]
    setVotesStatus(data)
    console.log(data)
  }

  useEffect(() => {
    contract?.on("VoteCast", (...props) => {
      console.log(props)
    })
    getVotes()
  }, [contract])

  async function vote(index: number) {
    try {
      await contract?.vote(index)
      toast({
        title: "Voted Successfully",
        description: `voted for ${votesStatus[index]}`,
      })
    } catch (error) {
      toast({
        title: "Error while voting",
        description: (
          <pre>
            <code>{JSON.stringify(error, null, 2)}</code>
          </pre>
        ),
      })
    }
  }

  return (
    <div className="w-full">
      {account ? (
        <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
          <p>
            Your address:{" "}
            <span className="bg-secondary rounded p-1">{account}</span>
          </p>
          <p>
            Contract address:{" "}
            <span className="bg-secondary rounded p-1">
              {contract?.getAddress()}
            </span>{" "}
          </p>
          <div className="flex gap-4">
            {votesStatus.map((status, i) => (
              <Button variant="secondary" className="w-28" disabled key={i}>
                {status}
              </Button>
            ))}
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                vote(0)
              }}
            >
              vote for 0
            </Button>
            <Button
              onClick={() => {
                vote(1)
              }}
            >
              vote for 1
            </Button>
            <Button
              onClick={() => {
                vote(2)
              }}
            >
              vote for 2
            </Button>
          </div>
        </div>
      ) : (
        <Button onClick={connect}>Connect Your wallet</Button>
      )}
    </div>
  )
}
