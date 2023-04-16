(async function () {
    const response=await fetch("./data.json");
    const movies= await response.json();
    // console.log(obj);
    const genereElem=document.getElementById("genere");
    const yearElem=document.getElementById("year");
    const languageElem=document.getElementById("language");
    const ratingElem=document.getElementById("rating");
    const btnElem=document.getElementById("search");
    const displayElem=document.getElementById("movies-list");

    function displayResults(results) {
        displayElem.innerHTML = "";
        tr = document.createElement("tr");
        const listItem = `
            <th>Rank</th>
            <th>Movie</th>
            <th>Year</th>
            `;
        tr.innerHTML = listItem;
        displayElem.appendChild(tr);
        results.forEach(function (movie) {
          source = "https://www.themoviedb.org/t/p/original" + movie.poster_path;
          date = new Date(movie.release_date);
          year = date.getFullYear();
          tr = document.createElement("tr");
          const listItem = `
                    <td style="width: 3%;">  ${movie.id} </td>
                    <td>
                        <div style="display: flex;flex-direction: row;">
                            <img src=${source} style="width: 3%;height: 2%;"/>
                            <div style="display: flex;flex-direction: column;">
                                <div style="color: rgb(0, 140, 255);">                           
                                    ${movie.title} 
                                </div>
                                <div>
                                    <span style="font-size: small;">
                                        <b><u>${movie.certification}</u></b>
                                    </span>
                                    <span style="font-size: small;color:grey;">
                                        ${movie.genres}
                                    </span>
                                    <span style="font-size: small;color:grey;">
                                        ${Math.floor(movie.runtime / 60)}
                                        h 
                                        ${Math.floor(movie.runtime % 60)}
                                        m
                                    </span>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td style="width: 3%;"> ${year} </td>
                `;
          tr.innerHTML = listItem;
          displayElem.appendChild(tr);
        });
      }
    function searchfunc()
    {
        const genereVal=genereElem.value;
        const yearVal=(yearElem.value);
        const languageVal=(languageElem.value);
        const ratingVal=ratingElem.value;
        
        const genereResults=movies.filter((function(movie)
        {
            if(genereVal!="")
            {
                return(movie.genres.toString("").includes(genereVal))
            }
            else
            {
                return (movie);
            }
        }))
        

        const results=genereResults.filter((function(movie)
        {
            if( yearVal!="" )
                return( movie.release_date.includes(yearVal)
                );
            else
                
                return(movie);        
        }))
        const languageresults=results.filter((function(movie)
        {            
            if( languageVal!="")
                return( movie.original_language.includes(languageVal) 
                );
            else
                
                return(movie);        
        }))
        const ratingResults=languageresults.filter((function(movie)
        {
            if( ratingVal!="")
                return( movie.vote_average===parseFloat(ratingVal) 
                );
            else
                
                return(movie);        
        }))

        displayResults(ratingResults);
        
    }
    btnElem.addEventListener('click',searchfunc);
})()
