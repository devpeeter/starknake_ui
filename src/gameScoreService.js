import { supabase } from './supabaseClient'

export const submitGameScore = async (walletAddress, score, gameDuration = 0) => {
  try {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress)
      .maybeSingle()

    if (userError) throw userError

    if (!userData) {
      console.error('User not found in database')
      return { success: false, error: 'User not found' }
    }

    const { error: scoreError } = await supabase
      .from('game_scores')
      .insert({
        user_id: userData.id,
        wallet_address: walletAddress,
        score: score,
        game_duration: gameDuration,
        played_at: new Date().toISOString()
      })

    if (scoreError) throw scoreError

    const newTotalScore = userData.total_accumulated_score + score
    const newGamesPlayed = userData.games_played + 1
    const newHighestScore = Math.max(userData.highest_score, score)

    const { error: updateError } = await supabase
      .from('users')
      .update({
        total_accumulated_score: newTotalScore,
        games_played: newGamesPlayed,
        highest_score: newHighestScore,
        updated_at: new Date().toISOString()
      })
      .eq('wallet_address', walletAddress)

    if (updateError) throw updateError

    return {
      success: true,
      data: {
        totalScore: newTotalScore,
        gamesPlayed: newGamesPlayed,
        highestScore: newHighestScore
      }
    }
  } catch (error) {
    console.error('Error submitting game score:', error)
    return { success: false, error: error.message }
  }
}

export const getPlayerStats = async (walletAddress) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress)
      .maybeSingle()

    if (error) throw error

    return {
      success: true,
      data: data
    }
  } catch (error) {
    console.error('Error fetching player stats:', error)
    return { success: false, error: error.message }
  }
}

export const getRecentGames = async (walletAddress, limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('game_scores')
      .select('*')
      .eq('wallet_address', walletAddress)
      .order('played_at', { ascending: false })
      .limit(limit)

    if (error) throw error

    return {
      success: true,
      data: data
    }
  } catch (error) {
    console.error('Error fetching recent games:', error)
    return { success: false, error: error.message }
  }
}
