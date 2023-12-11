let playerCharacter = {
    playerName : "Zero", // Players name
    maxSecurityScore : 100, // Max Health
    currentSecurityScore : 100, // Current Health
    position : null,
    sprite : "Zero", // May need to change based on what we name the sprite
    isInCombat : false, // Bool to represent if the player is in combat or not
    isInDialog : false, // Bool to represent if the player is in a dialog or not
    attacks : [
        {
            desc : "Remediate is an attack that is effective against malware.", // Description of attack (maybe showable on selected?)
            effectiveAgainst : [Types.Malware, Types.Exploit], // Types this attack is effective against, will need to use .includes()
            attackName : "Remediate", // Atack name to be shown on the attack select menu
            effectiveDamage : 100, // Damage done when attacking a threat that's weak to this
            ineffectiveMinDamage : 5, // Minimum Damage done when attack a threat that's not weak to this
            ineffectiveMaxDamage : 15, // Maximum Damage done when attack a threat that's not weak to this
            attackText : `Zero used Remediate!` // Text to be displayed for the attack
        },
        {
            desc : "Install Browser Guard is an attack that is effective against Trackers.",
            effectiveAgainst : [Types.Tracker],
            attackName : "Install Browser Guard",
            effectiveDamage : 100,
            ineffectiveMinDamage : 5,
            ineffectiveMaxDamage : 15,
            attackText : `Zero used Install Browser Guard!`
        },
        {
            desc : "Report Spam is an attack that is effective against phishing and scams.",
            effectiveAgainst : [Types.Scam],
            attackName : "Report Spam",
            effectiveDamage : 100,
            ineffectiveMinDamage : 5,
            ineffectiveMaxDamage : 15,
            attackText : `Zero used Report Spam!` // Text to be displayed for the attack
        },
        {
            desc : "Enable Firewall is an attack that is effective against Brute Force attacks.",
            effectiveAgainst : [Types.BruteForce],
            attackName : "Enable Firewall",
            effectiveDamage : 100,
            ineffectiveMinDamage : 5,
            ineffectiveMaxDamage : 15,
            attackText : `Zero used Enable Firewall!`
        }
    ]
}

const getPlayer = () => {
    return playerCharacter;
}