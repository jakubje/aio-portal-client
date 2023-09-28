import React, { useState } from 'react';
import { Card, Row, Col, Select } from 'antd';
import { v1 as uuidv1 } from 'uuid';
import { useGetCompetitonsQuery, useGetFixturesQuery, useGetResultsQuery } from '../../services/footballApi';
import Loader from '../Loader';
import _ from 'lodash';

const { Option } = Select;

const Football = () => {
  const [league, setLeague] = useState('premierleague');

  const { data: footballLeagues } = useGetCompetitonsQuery();
  const { data: matchData } = useGetResultsQuery(league);
  const { data, isFetching } = useGetFixturesQuery(league);
  if (isFetching) return <Loader />;

  const gameDetails = data?.[0];
  const matchResults = matchData?.[0];
  const games = [];
  const matchResultsFormatted = [];

  let cleanedDataFootballLeagues = footballLeagues.replace('{', '').replace('}', '').split(',');

  // useEffect(() => {
  for (const matchday in gameDetails) {
    for (const schedule in gameDetails[matchday]) {
      games.push(gameDetails[matchday][schedule]);
    }
  }
  // console.log(matchResults?.[0]);
  console.log(matchResults);
  for (const matchDayWeek in matchResults) {
    // matchResultsFormatted.push(matchDayWeek: {})
    console.log(matchResults[matchDayWeek]);
    for (const match in matchResults[matchDayWeek]) {
      // console.log(matchResults[matchDayWeek][match]);
      // console.log(matchResults[matchDayWeek][match]['homeTeam']);
      // matchResults[matchDayWeek][match]['matchDayWeek'] = matchDayWeek;
      matchResultsFormatted.push(matchResults[matchDayWeek][match]);
      // results.push(matchResults[matchResult][schedule]);
      // }
    }
  }

  cleanedDataFootballLeagues = cleanedDataFootballLeagues.reduce((acc, char) => (acc.includes(char) ? acc : [...acc, char]), []);

  // }, [league, gameDetails]);

  return (
    <>
      <Col span={24}>
        <Select
          showSearch
          className="select-football"
          placeholder={league}
          optionFilterProp="children"
          onChange={(value) => setLeague(value)}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="Football Leagues">Football Leagues</Option>
          {cleanedDataFootballLeagues.map((league) => (
            <Option value={league}>{league.toUpperCase()}</Option>
          ))}
        </Select>
      </Col>

      <Row
        gutter={[32, 32]}
        className="crypto-card-container"
      >
        {games?.map((game) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={`${game.homeTeam}${uuidv1()}`}
          >
            <Card
              title={`${game.homeTeam} vs ${game.awayTeam}`}
              style={{ textOverflow: '' }}
              extra={
                <img
                  className="crypto-image"
                  alt={`${game.homeTeam}`}
                  src={game.homeLogo}
                />
              }
              hoverable="true"
            >
              <p>Match Day: {game.MatchDay}</p>
            </Card>
          </Col>
        ))}
        <hr></hr>

        <h1>Results</h1>
        {matchResultsFormatted?.map((result) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={`${result.homeTeam}${uuidv1()}`}
          >
            <Card
              title={`${result.homeTeam} vs ${result.awayTeam}`}
              style={{ textOverflow: '' }}
              extra={
                <img
                  className="crypto-image"
                  alt={`${result.homeTeam}`}
                  src={result.homeLogo}
                />
              }
              hoverable="true"
            >
              <p>
                {result.homeTeamScore} : {result.awayTeamScore}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Football;
