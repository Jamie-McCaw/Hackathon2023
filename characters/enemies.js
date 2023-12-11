let enemies = {
    [Types.Malware] : {
        openingMessages : ["Looks like you've downloaded my software! Time to infect you!"], // Opening fight message
        attacks : [{ // Enemies only have 1 attack
            desc : "infect",
            attackName : "Infect",
            minDamage: 25,
            maxDamage: 25,
            attackText : `%1 attempted to %2 your computer!` // %1 will be the threat name, %2 will be the attack name
        }],
        description : "Malware, or “malicious software”, is an umbrella term that refers to any malicious program or code that is harmful to systems. \n\n The motives behind malware vary. Malware can be about making money off you, sabotaging your ability to get work done, making a political statement, or just bragging rights. \n\n Although malware cannot damage the physical hardware of systems or network equipment, it can steal, encrypt, or delete your data, alter or hijack core computer functions, and spy on your computer activity without your knowledge or permission", //description of malware (used for glossary)
        pageUrl : "https://www.malwarebytes.com/malware",
        usable : true, //should be used
        threatName: "Malware Mark",
        imageLarge : BattleSprites.malwareMark,
        imageSmall : WorldSprites.malwareMark,
        type : Types.Malware,
        maxHealth : 100,
        currentHealth : 100,
        location : {
            x : 688.329,
            y : 976.897
        }
    },

    [Types.Scam] : {
        openingMessages : ["Dear Sir, I am prince John from Nigeria.", "I want to transfer all of my fortune outside if Nigeria due to a frozen account.", "If you could be so kind to help me transfer some money?"], // Opening fight message
        attacks : [{ // Enemies only have 1 attack
            desc : "scam",
            attackName : "Scam",
            minDamage: 25,
            maxDamage: 25,
            attackText : `%1 tried to get your bank account info using a %2!`
        }],
        description : "In cybersecurity, scams are attempts to obtain money or something else of value through dishonest means, mostly over the Internet, though sometimes with a phone call. \n\n Scammers try to quickly gain your trust. They will try to pressure you into acting without thinking. \n\n If a message or call makes you suspicious, stop and consider the language it uses.", //description of malware (used for glossary)
        pageUrl : "https://www.malwarebytes.com/glossary/scam",
        usable : true, //should be used
        threatName: "Nigerian Prince John",
        imageLarge : BattleSprites.nigerianPrinceJohn,
        imageSmall : WorldSprites.nigerianPrinceJohn,
        type : Types.Scam,
        maxHealth : 100,
        currentHealth : 100,
        location : {
            x : 1129.492,
            y : 906.068
        }
    },

    [Types.Exploit] : {
        openingMessages : ["Hey there! Hope you're having a good day. Got any old software installed?", "Maybe visit http://www.malwarebites.com/ for me?"], // Opening fight message
        attacks : [{ // Enemies only have 1 attack
            desc : "Zero day Exploit",
            attackName : "Zero-Day Vulnerability",
            minDamage: 25,
            maxDamage: 25,
            attackText : `%1 used a %2 to run malicious code!`
        }],
        description : "Exploit is a type of malware that takes advantage of bugs or vulnerabilities, which cybercriminals use to gain illicit access to a system. Exploit attacks often start with malspam and drive-by downloads. \n\n Cybercriminals trick unsuspecting victims into opening an infected email attachment or clicking links that redirect to a malicious website.", //description of malware (used for glossary)
        pageUrl : "https://www.malwarebytes.com/exploits",
        usable : true,
        threatName : "Exploit Eagan",
        imageLarge : BattleSprites.exploitEagan,
        imageSmall : WorldSprites.exploitEagan,
        type : Types.Exploit,
        maxHealth : 100,
        currentHealth : 100,
        location : {
            x : 1292.336,
            y : 187.856
        }
    },
    [Types.Tracker] : {
      openingMessages : ["I can see your every move. Every keystoke! Someone will pay me well for this information.", "This will make a fine addition to my collection."], // Opening fight message
        attacks : [{ // Enemies only have 1 attack
            desc : "Trackware",
            attackName : "Trackware",
            minDamage: 25,
            maxDamage: 25,
            attackText : `%1 gathered your personal information!`
        }],
        description : "Trackware is a type of program used to gather system information and/or user activity from computing devices, and then send the information to a third-party entity. \n\n Trackware is most commonly associated with programs dealing with advertising (adware). \n\n They are also often distributed bundled together with other legitimate programs.", //description of malware (used for glossary)
        pageUrl : "https://www.malwarebytes.com/exploits",
        usable : true,
        threatName : "Tracker Chuck",
        imageLarge : BattleSprites.trackerChuck,
        imageSmall : WorldSprites.trackerChuck,
        type : Types.Tracker,
        maxHealth : 100,
        currentHealth : 100,
        location : {
            x : 139.459,
            y : 561.746
        }        
    },

    [Types.BruteForce] : {
      openingMessages : ["My attacks will keep coming and it just won't stop!", "I'll break through your defenses eventually!"], // Opening fight message
        attacks : [{ // Enemies only have 1 attack
            desc : "Brute Force Attack",
            attackName : "Brute Force Attack",
            minDamage: 25,
            maxDamage: 25,
            attackText : `%1 tried guessing your password by using a %2!`
        }],
        description : "A brute force attack is a method wherein an application attempts to decode encrypted data, such as a password, by trial and error. \n\n These attacks are done by ‘brute force’ meaning they use excessive forceful attempts to try and ‘force’ their way into your private account(s). \n\n A dictionary attack, for example, is a type that falls under this attack.", //description of malware (used for glossary)
        pageUrl : "https://www.malwarebytes.com/",
        usable : true,
        threatName : "Brute Force Sherwood",
        imageLarge : BattleSprites.bruteForceSherwood,
        imageSmall : WorldSprites.bruteForceSherwood,
        type : Types.BruteForce,
        maxHealth : 100,
        currentHealth : 100,
        location : {
            x : 1518.977,
            y : 905.837
        }         
    },
    [Types.Marc1n] : {
        openingMessages : ["Hey Malwarenaut!", "Great job on cleaning up here! I don't think there are any other threats left...", "Now... ", "I need you to handle a short but urgent task. - Thanks, Marcin Kleczynski."], // Opening fight message
        attacks : [{ // Enemies only have 1 attack
            desc : "Suspicious Text Message",
            attackName : "Suspicious Text Message",
            minDamage: 25,
            maxDamage: 25,
            attackText : `%1 asked you for $1000 by sending you a %2!`
        }],
        description : "In cybersecurity, scams are attempts to obtain money or something else of value through dishonest means, mostly over the Internet, though sometimes with a phone call.", //description of malware (used for glossary)
        pageUrl : "https://www.malwarebytes.com/",
        usable : false,
        threatName : "Marc1n Kl3kcynskii?",
        imageLarge : BattleSprites.marc1n,
        imageSmall : WorldSprites.marc1n,
        type : Types.Scam,
        maxHealth : 100,
        currentHealth : 100,
        location : {
            x : 1518.977,
            y : 905.837
        }   
    }
}

let getEnemies = () => {
    return enemies;
}