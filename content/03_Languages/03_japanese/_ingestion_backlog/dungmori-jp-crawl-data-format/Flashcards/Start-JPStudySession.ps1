# ============================================================
# Interactive Japanese Vocabulary Quiz (N5/N4)
# Run: .\Start-JPStudySession.ps1
# ============================================================

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$n5Path = Join-Path $scriptDir "01_Flashcards_N5.md"
$n4Path = Join-Path $scriptDir "02_Flashcards_N4.md"

Clear-Host
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "       🇯🇵 JAPANESE VOCABULARY STUDY SESSION (N5/N4)       " -ForegroundColor Cyan -BackgroundColor DarkBlue
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Select Level
Write-Host "`nSelect Level:" -ForegroundColor Yellow
Write-Host "1) N5 Vocabulary (Sơ cấp N5)"
Write-Host "2) N4 Vocabulary (Sơ cấp N4)"
Write-Host "3) Both N5 and N4"
$levelChoice = Read-Host "Choice (1-3, default: 1)"
if ($levelChoice -eq "2") {
    $filesToLoad = @($n4Path)
    $levelText = "N4"
} elseif ($levelChoice -eq "3") {
    $filesToLoad = @($n5Path, $n4Path)
    $levelText = "N5 & N4"
} else {
    $filesToLoad = @($n5Path)
    $levelText = "N5"
}

# 2. Select Mode
Write-Host "`nSelect Mode:" -ForegroundColor Yellow
Write-Host "1) Japanese -> Meaning (Show JP, Guess VN meaning)"
Write-Host "2) Meaning -> Japanese (Show VN, Guess JP word)"
$modeChoice = Read-Host "Choice (1-2, default: 1)"
$mode = if ($modeChoice -eq "2") { "VN2JP" } else { "JP2VN" }

# 3. Shuffle
$shuffleChoice = Read-Host "`nShuffle vocabulary? (Y/N, default: Y)"
$shuffle = if ($shuffleChoice -eq "n" -or $shuffleChoice -eq "N") { $false } else { $true }

# 4. Limit
$limitInput = Read-Host "`nLimit number of words? (Enter number or 'All', default: 20)"
$limit = 20
if ($limitInput -match "^\d+$") {
    $limit = [int]$limitInput
} elseif ($limitInput -eq "All" -or $limitInput -eq "all") {
    $limit = 999999
}

# Load and Parse Flashcards
Write-Host "`nLoading vocabulary from source markdown files..." -ForegroundColor Gray
$vocabList = @()

foreach ($filePath in $filesToLoad) {
    if (-not (Test-Path $filePath)) {
        Write-Host "Error: Source file not found: $filePath" -ForegroundColor Red
        continue
    }
    
    $lines = Get-Content $filePath -Encoding UTF8
    foreach ($line in $lines) {
        $line = $line.Trim()
        if (-not $line.StartsWith("|") -or $line -like "*---|---|*" -or $line -like "*Từ Vựng*") {
            continue
        }
        
        $parts = $line.Split("|") | ForEach-Object { $_.Trim() }
        # Remove first and last empty elements due to trailing pipes
        if ($parts.Count -lt 5) { continue }
        
        $word = $parts[1] -replace '^\*\*|\*\*(?=\s|$)', '' -replace '\*\*$', ''
        $wType = $parts[2]
        $meaning = $parts[3]
        
        $exJP = ""
        $exVN = ""
        
        if ($parts.Count -eq 5) {
            $exVN = $parts[4]
        } elseif ($parts.Count -ge 6) {
            $exJP = $parts[4]
            $exVN = $parts[5]
        }
        
        if (-not $word) { continue }
        
        $vocabList += [PSCustomObject]@{
            Word      = $word
            Type      = $wType
            Meaning   = $meaning
            ExampleJP = $exJP
            ExampleVN = $exVN
        }
    }
}

if ($vocabList.Count -eq 0) {
    Write-Host "No vocabulary found. Press any key to exit." -ForegroundColor Red
    [void][Console]::ReadKey($true)
    exit
}

Write-Host "Total loaded: $($vocabList.Count) words." -ForegroundColor Green

# Apply Shuffle
if ($shuffle) {
    # Custom shuffle using random sorting
    $vocabList = $vocabList | Get-Random -Count $vocabList.Count
}

# Apply Limit
$vocabToQuiz = $vocabList | Select-Object -First $limit
$totalQuizCount = $vocabToQuiz.Count

Write-Host "Starting quiz session with $totalQuizCount words ($levelText)..." -ForegroundColor Green
Write-Host "Press [Enter] after guessing to reveal the answer, then mark [Y/N] for scoring.`n" -ForegroundColor Yellow

$correctCount = 0
$index = 1

foreach ($item in $vocabToQuiz) {
    Clear-Host
    Write-Host "Word $index / $totalQuizCount" -ForegroundColor Cyan
    Write-Host "----------------------------------------------------------" -ForegroundColor Cyan
    
    if ($mode -eq "JP2VN") {
        Write-Host "`n   Vocabulary:  " -NoNewline -ForegroundColor Gray
        Write-Host "$($item.Word)" -ForegroundColor White -BackgroundColor Black -FontBold
        if ($item.Type) {
            Write-Host "   Type:        $($item.Type)" -ForegroundColor Gray
        }
    } else {
        Write-Host "`n   Meaning:     " -NoNewline -ForegroundColor Gray
        Write-Host "$($item.Meaning)" -ForegroundColor White -BackgroundColor Black -FontBold
        if ($item.Type) {
            Write-Host "   Type:        $($item.Type)" -ForegroundColor Gray
        }
    }
    
    Write-Host "`nPress [Enter] to reveal the answer..." -ForegroundColor DarkGray
    [void][Console]::ReadLine()
    
    Write-Host "----------------------------------------------------------" -ForegroundColor Gray
    Write-Host "   Answer:      " -NoNewline -ForegroundColor Gray
    if ($mode -eq "JP2VN") {
        Write-Host "$($item.Meaning)" -ForegroundColor Green
    } else {
        Write-Host "$($item.Word)" -ForegroundColor Green
    }
    
    if ($item.ExampleJP -or $item.ExampleVN) {
        Write-Host "`n   Example:" -ForegroundColor Yellow
        if ($item.ExampleJP) {
            Write-Host "   JP: $($item.ExampleJP)" -ForegroundColor White
        }
        if ($item.ExampleVN) {
            Write-Host "   VN: $($item.ExampleVN)" -ForegroundColor Gray
        }
    }
    
    Write-Host "`nDid you get it right? (Y/N, default: Y)" -NoNewline -ForegroundColor Yellow
    $userScore = [Console]::ReadKey($true).KeyChar
    if ($userScore -eq 'n' -or $userScore -eq 'N') {
        Write-Host " [Incorrect]" -ForegroundColor Red
    } else {
        Write-Host " [Correct]" -ForegroundColor Green
        $correctCount++
    }
    
    $index++
    Start-Sleep -Milliseconds 300
}

# Results Summary
Clear-Host
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "                   STUDY SESSION SUMMARY                  " -ForegroundColor Cyan -BackgroundColor DarkBlue
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "`nLevel:       $levelText"
Write-Host "Total Words: $totalQuizCount"
Write-Host "Correct:     $correctCount"
Write-Host "Incorrect:   $($totalQuizCount - $correctCount)"

$scorePercentage = [Math]::Round(($correctCount / $totalQuizCount) * 100, 1)
Write-Host "`nScore:       " -NoNewline
if ($scorePercentage -ge 80) {
    Write-Host "$scorePercentage% (Excellent!)" -ForegroundColor Green
} elseif ($scorePercentage -ge 50) {
    Write-Host "$scorePercentage% (Keep practicing!)" -ForegroundColor Yellow
} else {
    Write-Host "$scorePercentage% (Need more study)" -ForegroundColor Red
}
Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "Press any key to exit..."
[void][Console]::ReadKey($true)
