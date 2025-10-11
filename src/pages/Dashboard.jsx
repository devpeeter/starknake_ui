import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function Dashboard({ playerDetails, address, connectWallet, updateUsername, loading, error }) {
  const navigate = useNavigate()
  const [newUsername, setNewUsername] = useState("")
  const [showUsernameForm, setShowUsernameForm] = useState(false)
  const [copied, setCopied] = useState(false)
  const [scoreStats, setScoreStats] = useState(null)
  const [recentGames, setRecentGames] = useState([])
  const [statsLoading, setStatsLoading] = useState(true)

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

  useEffect(() => {
    if (address) {
      fetchScoreStats()
    }
  }, [address])

  const fetchScoreStats = async () => {
    try {
      setStatsLoading(true)

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', address)
        .maybeSingle()

      if (userError) throw userError

      if (userData) {
        setScoreStats({
          totalScore: userData.total_accumulated_score || 0,
          gamesPlayed: userData.games_played || 0,
          highestScore: userData.highest_score || 0,
          averageScore: userData.games_played > 0
            ? Math.round(userData.total_accumulated_score / userData.games_played)
            : 0
        })
      }

      const { data: gamesData, error: gamesError } = await supabase
        .from('game_scores')
        .select('*')
        .eq('wallet_address', address)
        .order('played_at', { ascending: false })
        .limit(5)

      if (gamesError) throw gamesError

      setRecentGames(gamesData || [])
    } catch (err) {
      console.error('Failed to fetch score stats:', err)
    } finally {
      setStatsLoading(false)
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

        {statsLoading ? (
          <div className="stats-loading">
            <p>Loading score statistics...</p>
          </div>
        ) : scoreStats && (
          <div className="score-stats">
            <h2>Score Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Accumulated Score</h3>
                <p className="stat-value">{scoreStats.totalScore.toLocaleString()}</p>
              </div>
              <div className="stat-card">
                <h3>Games Played</h3>
                <p className="stat-value">{scoreStats.gamesPlayed}</p>
              </div>
              <div className="stat-card">
                <h3>Average Score</h3>
                <p className="stat-value">{scoreStats.averageScore.toLocaleString()}</p>
              </div>
            </div>

            {recentGames.length > 0 && (
              <div className="recent-games">
                <h3>Recent Games</h3>
                <div className="games-list">
                  {recentGames.map((game) => (
                    <div key={game.id} className="game-item">
                      <span className="game-score">{game.score}</span>
                      <span className="game-date">
                        {new Date(game.played_at).toLocaleDateString()} {new Date(game.played_at).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {playerDetails && (
          <div className="hidden-section">
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