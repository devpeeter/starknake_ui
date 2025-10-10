import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard({ playerDetails, address, connectWallet, updateUsername, loading, error }) {
  const navigate = useNavigate()
  const [newUsername, setNewUsername] = useState("")
  const [showUsernameForm, setShowUsernameForm] = useState(false)
  const [copied, setCopied] = useState(false)

  const handlePlayGame = () => {
    navigate('/game')
  }

  const handleUpdateUsername = async (e) => {
    e.preventDefault()
    await updateUsername(newUsername)
    setNewUsername("")
    setShowUsernameForm(false)
  }

  const copyToClipboard = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <img src="/sprites/logo.png" alt="Snake Attack" className="dashboard-logo" />
          <h1>Player Dashboard</h1>
          <button onClick={connectWallet} className="disconnect-btn">
            Disconnect Wallet
          </button>
        </div>

        {playerDetails && (
          <div className="player-info">
            <div className="info-card">
              <h3>Username</h3>
              <div className="username-section">
                <p className="username">{playerDetails.username}</p>
                <button
                  onClick={() => setShowUsernameForm(!showUsernameForm)}
                  className="edit-btn"
                >
                  Edit
                </button>
              </div>

              {showUsernameForm && (
                <form onSubmit={handleUpdateUsername} className="username-form">
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Enter new username"
                    maxLength={50}
                    className="username-input"
                  />
                  <button type="submit" disabled={loading} className="update-btn">
                    {loading ? 'Updating...' : 'Update'}
                  </button>
                </form>
              )}
            </div>

            <div className="info-card">
              <h3>Wallet Address</h3>
              <div className="address-section">
                <p className="address">{address?.slice(0, 10)}...{address?.slice(-8)}</p>
                <button onClick={copyToClipboard} className="copy-btn">
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="info-card">
              <h3>Highest Score</h3>
              <p className="score">{playerDetails.score}</p>
            </div>

            <div className="info-card">
              <h3>Leaderboard Position</h3>
              <p className="position">#{playerDetails.position}</p>
            </div>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        <div className="play-section">
          <button onClick={handlePlayGame} className="play-game-btn">
            <img src="/sprites/but_play.png" alt="Play" className="play-icon" />
            <span>PLAY GAME</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard